import { Button, CardBody, CardFooter, ChevronDownIcon, ChevronUpIcon } from "@ponyswapdex/uikit";
import PageBanner from "components/PageBanner";
import AppBody from "pages/AppBody";
import React, {useCallback, useState} from "react";
import { Box, Flex, Text } from "rebass";
import CurrencySearchModal from 'components/SearchModal/CurrencySearchModal';
import { Currency } from "@pantherswap-libs/sdk";
import CurrencyLogo from "components/CurrencyLogo";
import moment from "moment";
import PageHeader from "components/PageHeader";
import { Wrapper } from "components/swap/styleds";
import { LightCard } from "components/Card";
import { AutoColumn } from "components/Column";
import { useActiveWeb3React } from "hooks";
import ConnectWalletButton from "components/ConnectWalletButton";
import { AutoRow } from "components/Row";
import { Separator } from "components/SearchModal/styleds";
import useDividends from "hooks/useDividends";

enum Fields {
    TOKEN0 = 0,
    TOKEN1 = 1
}

const TrackerPage = () => {
    const {account} = useActiveWeb3React();

    const [showSearch, setShowSearch] = useState<boolean>(false)
    const [showDetails, setShowDetails] = useState<boolean>(false)
    const [token0, setToken0] = useState<Currency | any>("");
    const [token1, setToken1] = useState<Currency | any>("");
    const [activeField, setActiveField] = useState<number>(Fields.TOKEN1)
    const [tokenAddress, setTokenAddress] = useState<string>("");
    const {dividends, error} = useDividends(tokenAddress, token1 ?? "");
    console.log(dividends, error);
    const handleSearchDismiss = useCallback(() => {
        setShowSearch(false)
    }, [setShowSearch]);

    const handleCurrencySelect = useCallback(
        (currency: Currency | any) => {
          if (activeField === Fields.TOKEN0) {
            setToken0(currency);
            setTokenAddress(currency.address ?? null)
          } else {
            setToken1(currency.address);
          }
        },
        [activeField]
      )

    return (
        <>
            <PageBanner bgImage="/images/header-forest-bg.png" description="from any BSC token" title='Track your rewards' />
            <Flex padding={['0 20px', '0 20px', '0 20px', '0 90px']} justifyContent="center" width={[1, 1, 1, 2/3]}>
                <AppBody maxWidth="800px">
                    <Wrapper>
                        <PageHeader withoutSettings title="Tracker" description="Review your past rewards in an instant" />
                        <CardBody px='30px !important' pt='30px !important'>
                            <Text>Start by selecting a token</Text>
                            <Button
                                variant="secondary"
                                mb={30}
                                mt={30}
                                onClick={() => {
                                    setShowSearch(true);
                                    setActiveField(Fields.TOKEN0);
                                }}
                                startIcon={token0 ? <CurrencyLogo currency={token0} style={{ marginRight: '.5rem' }} /> : null}
                                endIcon={<ChevronDownIcon width="24px" color="textSubtle" />}
                                fullWidth
                                disabled={!account}
                                >
                                {token0 ? token0.symbol : 'Select a Token'}
                            </Button>
                            {error && (
                                <>
                                    <Text mb={30}>Please select the reward token</Text>
                                    <Button
                                        variant="secondary"
                                        mb={30}
                                        mt={0}
                                        onClick={() => {
                                            setShowSearch(true);
                                            setActiveField(Fields.TOKEN1);
                                        }}
                                        startIcon={token1 ? <CurrencyLogo currency={token1} style={{ marginRight: '.5rem' }} /> : null}
                                        endIcon={<ChevronDownIcon width="24px" color="textSubtle" />}
                                        fullWidth
                                        >
                                        {token1 ? token1.symbol : 'Select a Token'}
                                    </Button>
                                </>
                            )}
                            {account && token0 && 
                            <Box mt={30}>
                                <LightCard padding="45px 10px" mb={60}>
                                    <AutoRow justify="space-evenly">
                                        {dividends && dividends.dividends.length > 0 ?
                                            <>
                                                <AutoColumn gap="sm" justify="center">
                                                    <Text mb={2} fontSize={24} style={{ textAlign: 'center' }}>{dividends ? `${parseFloat(dividends.todayGainDollar).toFixed(2)} $` : '-'}</Text>
                                                    <Separator  />
                                                    <Text color="gray" mt={1} style={{ textAlign: 'center' }}>Today</Text>
                                                </AutoColumn>
                                                <AutoColumn gap="sm" justify="center">
                                                    <Text mb={2} fontSize={24} style={{ textAlign: 'center' }}>{dividends ? `${parseFloat(dividends.globalGainDollar).toFixed(2)} $` : '-'}</Text>
                                                    <Separator  />
                                                    <Text color="gray" mt={1} style={{ textAlign: 'center' }}>Total gains</Text>
                                                </AutoColumn>
                                                <AutoColumn gap="sm" justify="center">
                                                    <Text mb={2} fontSize={24} style={{ textAlign: 'center' }}>{dividends ? dividends.dividends?.length : '-'}</Text>
                                                    <Separator  />
                                                    <Text color="gray" mt={1} style={{ textAlign: 'center' }}>Number of txs</Text>
                                                </AutoColumn>
                                            </>
                                        :
                                            <>
                                                <AutoColumn gap="sm" justify="center">
                                                    <Text mb={2} fontSize={24} style={{ textAlign: 'center' }}>{token0 !== "" ? "🥲 No rewards for this token" : "Please select a token"}</Text>
                                                </AutoColumn>
                                            </>
                                        }
                                    </AutoRow>
                                </LightCard>  
                            </Box>
                            }                   
                            {!account && (
                                <Flex justifyContent="center" mt={0}>
                                    <ConnectWalletButton fullWidth />
                                </Flex>
                            )}                         
                        </CardBody>
                            {dividends && dividends.dividends.length > 0 && (
                                <CardFooter>                                   
                                    <Button onClick={() => setShowDetails(!showDetails)} fullWidth variant="text">
                                        Details {!showDetails ? <ChevronDownIcon /> : <ChevronUpIcon />}
                                    </Button>
                                    {showDetails && dividends && (
                                        <Box px={10}>
                                            <AutoRow justify="space-between">
                                                <AutoColumn gap="sm" justify="center">
                                                    <Text my={2} style={{ textAlign: 'center' }}>Date</Text>
                                                </AutoColumn>
                                                <AutoColumn gap="sm" justify="center">
                                                    <Text my={2} style={{ textAlign: 'center' }}>Amount</Text>
                                                </AutoColumn>
                                            </AutoRow>
                                            <Separator />
                                        
                                            {dividends && dividends.dividends.map((dividend) => (
                                                <>
                                                    <AutoRow justify="space-between">
                                                        <AutoColumn gap="sm" justify="center">
                                                            <Text fontSize={14} my={3}>{moment(dividend.timestamp*1000).format("MM/DD/YYYY")}</Text>
                                                        </AutoColumn>
                                                        <AutoColumn gap="sm" justify="center">
                                                            <Text fontSize={14} my={3}>{parseFloat(dividend.rawDollarValue).toFixed(2)} $</Text>
                                                        </AutoColumn>
                                                    </AutoRow>
                                                    <Separator />
                                                </>
                                            ))}
                                        </Box>
                                    )}
                                </CardFooter>
                            )}  
                    </Wrapper>
                </AppBody>
            </Flex>
            <CurrencySearchModal
                isOpen={showSearch}
                onCurrencySelect={handleCurrencySelect}
                onDismiss={handleSearchDismiss}
                showCommonBases
                selectedCurrency={(activeField === Fields.TOKEN0 ? token1 : token0) ?? undefined}
            />
            
        </>
    )
};

export default TrackerPage;