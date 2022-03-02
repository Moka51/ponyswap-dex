import { Button, Card, CardBody, Heading, Input } from "@ponyswapdex/uikit";
import React from "react";
import { Box, Flex, Text } from "rebass";
import Row from "components/Row"
import TokenIcon from "components/TokenIcon";
import CurrencyInputPanel from "components/CurrencyInputPanel";
import { useCurrency } from "hooks/Tokens";
import { useCurrencyBalance } from "state/wallet/hooks";
import ConnectWalletButton from "components/ConnectWalletButton";
import PresaleProgressBar, { BuyButtons } from "./styled";

export const PresaleCard = ({theme, account}) => {

    const BNB = useCurrency("ETH");
    const [amount, setAmount] = React.useState<string | any>("");
    const [showAmount, setShowAmount] = React.useState<boolean>(false);
    const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, BNB ?? undefined)

    const handleBuy = (type: "buy" | "cancel" | "showAmount") => {
        switch(type) {
            case "buy":
                console.log("buy")
                break;
            case "cancel":
                setShowAmount(false);
                setAmount("");
                break;
            case "showAmount":
                setShowAmount(true);
                break;
        }
    }

    return(
        <Card>
            <CardBody>
                <Heading fontSize='40px !important'>
                       PONY Presale
                </Heading>
                <Flex justifyContent="space-between" alignItems="center">
                    <TokenIcon logo='/images/192x192_App_Icon.png' address='0x1f546ad641b56b86fd9dceac473d1c7a357276b7' symbol="PONY" withMetamask />
                    <Box>
                        <Text textAlign="right" fontSize="0.8rem" opacity={0.5}>Total raised</Text>
                        <Text mt="7px" textAlign="right" fontSize="2rem" color={theme.colors.primary}>0 BNB</Text>
                    </Box>
                </Flex>
                <Box mt={30}>
                    <PresaleProgressBar value={0} />
                    <Flex flexDirection="column" style={{gap: 15}} mt={30}>
                        <Row justify="space-between">
                            <Text fontSize="0.9rem" opacity={0.5}>Available PONYs</Text>
                            <Text>100,000.00</Text>
                        </Row>
                        <Row justify="space-between">
                            <Text fontSize="0.9rem" opacity={0.5}>PONYs/BNB</Text>
                            <Text>1,000.00</Text>
                        </Row>
                        <Row justify="space-between">
                            <Text fontSize="0.9rem" opacity={0.5}>Investors</Text>
                            <Text>182</Text>
                        </Row>
                        <Row justify="space-between">
                            <Text fontSize="0.9rem" opacity={0.5}>Ending</Text>
                            <Text>12d 08h 32s</Text>
                        </Row>
                    </Flex>
                </Box>
                <Box mt={30}>
                    {showAmount && 
                        <Box>
                            <CurrencyInputPanel label="Amount BNB" id="presale-input" value={amount} disableCurrencySelect currency={BNB} onUserInput={(e) => setAmount(e)} onMax={() => setAmount(selectedCurrencyBalance?.toExact())} showMaxButton />
                            {amount > 0 && <Text textAlign="left" fontSize="0.9rem" mt={15}>{`${Number(amount)} BNB = ${(amount*1000).toFixed(3)} PONYs`}</Text>}
                        </Box>
                    }
                    <Flex mt={showAmount ? 30 : 0} style={{gap: '20px'}} alignItems="center">
                       {!account ? (
                            <ConnectWalletButton fullWidth />
                        ) : (
                            <>
                                {showAmount && 
                                    <Button variant="tertiary" fullWidth onClick={() => handleBuy('cancel')}>Cancel</Button>
                                }
                                <Button onClick={() => handleBuy(showAmount ? "buy" : "showAmount")} fullWidth>Buy PONY</Button>
                            </>
                        )}
                    </Flex>
                </Box>
            </CardBody>
        </Card> 
    )
}