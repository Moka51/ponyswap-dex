import { Button, Card, CardBody, CardHeader, CardRibbon, Heading, Image, Progress } from "@ponyswapdex/uikit";
import React from "react";
import { Box, Flex, Text } from "rebass";
import useTheme from "hooks/useTheme";
import Column from "components/Column";
import Row from "components/Row";
import { Timeline } from 'react-twitter-widgets'
import PageBanner from "components/PageBanner";
import { useActiveWeb3React } from "hooks";
import ConnectWalletButton from 'components/ConnectWalletButton';
import ProgressCircles from "components/ProgressSteps";
import TokenIcon from "components/TokenIcon";
import { useCurrencyBalance, useETHBalances, useTokenBalance } from "state/wallet/hooks";
import { Currency, Token } from "@pantherswap-libs/sdk";
import { DisabledCard } from "components/Card";
import { useToken } from "hooks/Tokens";
import PresaleProgressBar from "./styled";
import { PresaleCard } from "./cards";
import { dexStats, tokenStats } from "./config";


const RowHome = ({children}) => <Flex style={{gap: '40px'}} px={[20, 90]} py={20} alignItems="stretch" width="100%" flexWrap={["wrap", "wrap", "wrap", "nowrap"]}>{children}</Flex>;

const Home = () => {

    const {theme} = useTheme();
    const {account}: any = useActiveWeb3React();
    const token = useToken('0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c');
    const balance = useTokenBalance(account, token as Token);
    console.log(balance?.toFixed(10))
    return(
        <Flex alignSelf="start" width="100%" flexDirection="column" height='100%'>
            <PageBanner bgImage='/images/header-forest-bg.png' title="PonySwap" description="A Decentralized Exchange for ERC20 Tokens" />
            <RowHome>
                <Box width={[1, 1, 1, 1/2]}>
                   <PresaleCard theme={theme} account={account} />    
                </Box>  
                <Box width={[1, 1, 1, 1/2]}>
                    <DisabledCard message="Opening after presale">
                        <CardBody style={{backgroundImage: "url('/images/farm-staking-bg.png')", backgroundPosition:"top right", backgroundSize: "contain", backgroundRepeat: "no-repeat"}}>
                            <Heading fontSize='40px !important'>
                                    Staking & Farms
                            </Heading>
                            <TokenIcon logo='/images/192x192_App_Icon.png' address='0x1f546ad641b56b86fd9dceac473d1c7a357276b7' symbol="PONY" />
                            <Box mt={20}>
                                <Text color={theme.colors.primary}>PONY to harvest</Text>
                                <Text mt={15} mb='5px' fontSize={account ? "2.25em" : "1.5em"}>{account ? "0.000" : "LOCKED"}</Text>
                                <Text color={theme.colors.primary}>~$0.00</Text>
                            </Box>
                            <Box mt={30}>
                                <Text color={theme.colors.primary}>PONY in wallet</Text>
                                <Text mt={15} mb='5px' fontSize="1.5em">{account ? "0.000" : "LOCKED"}</Text>
                                <Text color={theme.colors.primary}>~$0.00</Text>
                            </Box>
                            <Flex mt={30} style={{gap: '20px'}} alignItems="center">
                                {!account ? (
                                    <ConnectWalletButton fullWidth />
                                ) : (
                                    <>
                                        <Button fullWidth>Harvest all</Button>
                                    </>
                                )}
                            </Flex>
                        </CardBody>
                    </DisabledCard> 
                </Box>                        
            </RowHome>        
            <RowHome>
                <Box width={[1, 1, 1, 1/2]}>
                        <Card>
                            <CardBody>
                                <Heading fontSize='24px !important'>TVL</Heading>
                                <Heading mt='30px' fontSize='34px !important'>$0</Heading>
                                <Text mt='10px' color={theme.colors.primary} fontSize='16px !important'>
                                    Across all Farms and Pools
                                </Text>
                            </CardBody>
                        </Card>                
                </Box>
                <Box width={[1, 1, 1, 1/2]}>
                    <Card style={{height: '100%'}}>
                        <CardBody>
                            <Flex flexDirection="column" alignItems="start" justifyContent="space-between" height="100%">
                                <Heading mb={30} fontSize='24px !important'>
                                    DEX Stats
                                </Heading>
                                {dexStats.map((stat) => (
                                    <Row padding='10px 0 0' justify="space-between">
                                        <Column>
                                            <Text fontSize="16px" fontWeight="normal">{stat.title}</Text>
                                        </Column>
                                        <Column>
                                            <Text fontSize="16px" fontWeight="normal">{stat.value}</Text>
                                        </Column>
                                    </Row>
                                ))}
                            </Flex>
                        </CardBody>
                    </Card>                 
                </Box>
            </RowHome>
            <RowHome>
                <Box width={[1, 1, 1, 1/2]}>
                    <Card style={{height: '100%'}}>
                        <CardHeader>
                            <Heading fontSize="34px !important">
                                Announcements
                            </Heading>
                        </CardHeader>
                        <CardBody>
                            <Timeline
                                dataSource={{
                                    sourceType: 'profile',
                                    screenName: 'dividend_tracer'
                                }}
                                options={{
                                    height: '400'
                                }}
                            />
                        </CardBody>
                    </Card>                
                </Box>
                <Box width={[1, 1, 1, 1/2]}>
                    <Card>
                        <CardBody>
                            <Flex flexDirection="column" alignItems="start" justifyContent="space-between" height="100%">
                                <Heading mb={15} fontSize='40px !important'>
                                    PONY Stats
                                </Heading>
                                {tokenStats.map((stat) => (
                                    <Row padding='5px 0 10px' justify="space-between">
                                        <Column>
                                            <Text fontSize="16px" fontWeight="normal">{stat.title}</Text>
                                        </Column>
                                        <Column>
                                            <Text fontSize="16px" fontWeight="normal">{stat.value}</Text>
                                        </Column>
                                    </Row>
                                ))}
                            </Flex>
                        </CardBody>
                    </Card> 
                    <Card style={{marginTop: '20px'}}>
                        <CardBody>
                            <Flex flexDirection="column" alignItems="start" justifyContent="space-between" height="100%">
                                <Heading mb={15} fontSize='28px !important'>
                                    PONY LP Worth
                                </Heading>
                                {dexStats.map((stat) => (
                                    <Row padding='5px 0 10px' justify="space-between">
                                        <Column>
                                            <Text fontSize="16px" fontWeight="normal">{stat.title}</Text>
                                        </Column>
                                        <Column>
                                            <Text fontSize="16px" fontWeight="normal">{stat.value}</Text>
                                        </Column>
                                    </Row>
                                ))}
                            </Flex>
                        </CardBody>
                    </Card>                
                </Box>
            </RowHome>
        </Flex>
    )

}

export default Home;