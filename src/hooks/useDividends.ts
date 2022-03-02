import { useCallback, useEffect, useState } from "react";
import { useActiveWeb3React } from "hooks";
import axios from "axios";
import {BigNumberish, ethers } from "ethers";
import { Contract } from '@ethersproject/contracts'
import moment from 'moment'
import { Web3Provider } from "@ethersproject/providers";
import {getPancakeRouterContract } from '../utils'
import { callContractMethod, getContractABI, getTracker, useContract } from "./useContract";
import { getBnbPrice } from "./useGetPriceData";


function readableValue(value: number, decimals: number){
    const read = (value / 10 ** decimals);
    return read.toFixed(10);
}

const getTokenDecimals = async (contract: Contract | null) => {
    if(!contract){
        return null;
    }
    const tokenDecimals = await callContractMethod(contract, "decimals");
    return tokenDecimals
}

const getAmountsOut = async (amountTokenIn: BigNumberish, tokenIn: string, tokenOut: string, library: Web3Provider) => {
    try {
        const pancakeInstance = getPancakeRouterContract(0, library);
        const options = {amountTokenIn, tokenIn, tokenOut}
        const amount = await callContractMethod(pancakeInstance, "getAmountsOut", options);
        return (amount[0] as number);
    } catch (err) {
        return false;
    }
}

const getBlockNumber = async (library: Web3Provider) => {
    const blockNumber = await library.getBlockNumber();
    return blockNumber
}

const getTokenValueForAmount = async (tokenRawAmount: number, address: string, library: Web3Provider) => {
    const tokenAmounts: number | boolean = await getAmountsOut(tokenRawAmount.toString(), address, "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", library);
    const amount = readableValue(tokenAmounts[0], 18);
    return amount;
}

const useDividends = (token: string, trackerAddress: string) => {

    const {account, library}: any = useActiveWeb3React();
    const [ABI, setABI]: any = useState();
    const contract: Contract | null = useContract(token, ABI ?? null);
    const [dividends, setDividends]: any = useState(null);
    const [error, setError] = useState<boolean>(false);

    const response: any = useCallback(async(url: string) => {const res = await axios.get(url); return res.data.result}, [])

    const getData = useCallback(async(wallet, tracker) => {
        const blockNumber = await getBlockNumber(library)
        const url = `https://api.bscscan.com/api?module=account&action=txlistinternal&address=${wallet}&startblock=0&endblock=${blockNumber}&sort=asc&apikey=JA73AMF9FJTNR1XV6GCITABDQT1XS4KJI7`
        const data: Array<any> = await response(url);
        const dataResults: any = []
        if(data && data.length > 0){
            data.map((transaction) => {
                if (ethers.utils.getAddress(transaction.from) === tracker) {
                    transaction.bnb = true
                    dataResults.push(transaction)
                }
                return dataResults;
            })
            if(dataResults.length === 0){
                const url2 = `https://api.bscscan.com/api?module=account&action=tokentx&address=${wallet}&startblock=0&endblock=${blockNumber}&sort=asc&apikey=JA73AMF9FJTNR1XV6GCITABDQT1XS4KJI7`
                const bepTokensData: Array<any> = await response(url2);
                if(bepTokensData && bepTokensData.length > 0){
                    bepTokensData.map((bepData) => {
                        if (ethers.utils.getAddress(bepData.from) === tracker) {
                            dataResults.push(bepData)
                        }
                        return dataResults;
                    })
                }
            }
        }

        return dataResults
    }, [library, response])


    const calculate = useCallback(async(wallet: string, tracker: string) => {
        try{
        const data = await getData(wallet, tracker);
        const dataResults: Array<any> = []
        const bnbPrice: number = await getBnbPrice();
        let todayGain = 0;
        let globalGain = 0;
        await Promise.all(data.map(async(transaction: any) => {
            if (ethers.utils.getAddress(transaction.from) === tracker) {
                const tokenAddress = transaction.contractAddress
                const tokenParsedValue = transaction.value
                let dollarValue: any;
                let tokenValue: any;
                if(Object.getOwnPropertyDescriptor(transaction, 'bnb')){
                    tokenValue = readableValue(transaction.value, 18)
                    dollarValue = tokenValue * bnbPrice
                }else{
                    const tokenDecimals = await getTokenDecimals(contract)
                    tokenValue = readableValue(transaction.value, tokenDecimals)
                    const tokenValueInBnb = await getTokenValueForAmount(tokenParsedValue, tokenAddress, library)
                    dollarValue = parseFloat(tokenValueInBnb) * bnbPrice
                }

                const object = {
                    timestamp: transaction.timeStamp,
                    rawDollarValue: dollarValue,
                    dollarValue: `${dollarValue} $`,
                    rawTokenValue: tokenValue,
                    bnbValue: `${tokenValue} ${(transaction.tokenSymbol ? transaction.tokenSymbol : "BNB")}`
                }
                globalGain += dollarValue

                const isCurrentDate = moment.unix(transaction.timeStamp).isSame(moment(), 'day')
                if (isCurrentDate) {
                    todayGain += dollarValue
                }
                dataResults.push(object)
            }
        }))

        const globalGainDollar = globalGain
        const todayGainDollar = todayGain

        dataResults.sort((x: any, y: any) => {
            return y.timestamp - x.timestamp;
        })

        return {dividends: dataResults, globalGain, todayGain, globalGainDollar, todayGainDollar}
    }catch(e){
        // console.log(e);
        return null;
    }
    }, [contract, getData, library])

    const showDividend = useCallback(async(wallet, tracker) => {
            const calculatedData = await calculate(wallet, tracker);
            return calculatedData;
    }, [calculate]);

    const checkTracker = useCallback(async(tokenAddress: string, customTracker = "") => {
        tokenAddress = ethers.utils.getAddress(tokenAddress);
        const contractAbi = await getContractABI(tokenAddress);
        setABI(contractAbi)
        let tracker = await getTracker(tokenAddress, contractAbi, account, library);
        if(customTracker !== "" && tracker === false){
            tracker = customTracker
        }else if(tracker === false){
            tracker = "";
        }else{
            tracker = tracker[0];
        }
        return tracker;
    }, [account, library])

    const fetch = useCallback((wallet: string, tracker: string | any) =>{
        return showDividend(wallet, tracker).then((data: any) => {
            if(error && tracker !== trackerAddress) setError(false);
            return setDividends(data)
        })
        .catch(() => {
            return setError(true)
        });
        
    }, [showDividend, error, trackerAddress])

    useEffect((): any => {
        if(account && token && token !== ""){
            return checkTracker(token, trackerAddress).then((tracker: string) => {
                if(tracker && tracker !== ""){
                    fetch(account, tracker)
                }else{
                    setError(true);
                }
                return null;
            })
        }
        return null;
    }, [account, token, fetch, trackerAddress, checkTracker])

    return {dividends, error};
}

export default useDividends;