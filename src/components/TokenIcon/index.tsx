import React from "react";
import { Box, Flex, Image, Text } from "rebass"
import { Button } from "@ponyswapdex/uikit"
import useMetamask from "hooks/useMetamask"

interface TokenIconProps {
    address?: string
    symbol?: string
    decimals?: number
    logo: string,
    withMetamask?: boolean
}

const TokenIcon = ({address= "", symbol = "", decimals = 18, logo, withMetamask = false}: TokenIconProps) => {
    return(
        <Flex mt={30} style={{gap: 15}} alignItems="center">
            <Image src={logo} width={70} height={70} />
            {withMetamask && 
                <AddToMetamaskButton address={address} symbol={symbol} decimals={decimals} image={logo}  />       
            }  
        </Flex>
    )
}

const AddToMetamaskButton = ({address, symbol, decimals, image}: {address: string, symbol: string, decimals: number, image: string}) => {
    const {suggestToken} = useMetamask()

    return(
        <Box>
            <Button size="sm"  style={{backgroundColor: "#333333"}} onClick={() => suggestToken(address,  symbol, decimals, image)}>
                <Flex alignItems="center" style={{gap: 10}} color="rgb(255, 114, 13)">
                    + <img src="/images/metamask.png" width={20} height={20} alt=""/>
                </Flex>
            </Button>
        </Box>
    )
}

export default TokenIcon;