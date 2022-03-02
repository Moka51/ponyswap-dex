import React from "react"
import { Button, Progress } from "@ponyswapdex/uikit"
import { Flex, Text } from "rebass"
import { useToken } from "hooks/Tokens"
import { Token, TokenAmount } from "@pantherswap-libs/sdk"
import { ApprovalState, useApproveCallback } from "hooks/useApproveCallback"
import { Spinner } from "components/Shared"
import ConnectWalletButton from 'components/ConnectWalletButton';
import { useWeb3React } from "@web3-react/core"
import { ROUTER_ADDRESS } from "../../../constants"

const PresaleProgressBar = ({value}: {value: number}) => {
    return(
        <>
            <Progress primaryStep={0} secondaryStep={value} />
            <Flex alignItems="center" justifyContent="space-between" mt={10}>
                <Text fontSize="0.8rem" opacity={0.5}>SC: 0 BNB</Text>
                <Text fontSize="0.8rem" opacity={0.5}>HC: 100 BNB</Text>
            </Flex>
        </>
    )
}

export const BuyButtons = ({tokenAddress}: {tokenAddress?: string}) => {

    const token = useToken(tokenAddress);
    const [approvalState, approve] = useApproveCallback(new TokenAmount(token as Token ?? undefined, '1000000000000000000'), ROUTER_ADDRESS);
    const {account} = useWeb3React();

    return(
        !account ? (
            <ConnectWalletButton fullWidth />
        ) : (
            <>
            <Button fullWidth disabled={approvalState !== ApprovalState.APPROVED}>Buy PONY</Button>
            {approvalState !== ApprovalState.APPROVED  &&
                <Button onClick={() => approve()} fullWidth>{approvalState === ApprovalState.PENDING ? <Spinner /> : "Approve PONY"}</Button>
            }
            </>
        )
    )

}

export default PresaleProgressBar;