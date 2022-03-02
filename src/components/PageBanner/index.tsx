import React from "react";
import styled from "styled-components";
import { Heading } from "@ponyswapdex/uikit";
import { Text, Flex } from "rebass";
import useTheme from "../../hooks/useTheme";

interface PageBannerProps {
    bgImage?: string;
    bgColor?: string;
    title: string;
    description: string;
}

const Head = styled(Heading)`
    font-size: 50px !important;
    margin-bottom: 15px !important;
    text-align: center;

    @media screen and (max-width: 600px){
        font-size: 32px !important;
    }
`

const HeaderWrapper = styled(Flex)<{bgImage?: string, bgColor?: string}>`
    ${({bgImage}) => `background-image: url(${bgImage})`};
    ${({bgColor}) => `background-color: ${bgColor}`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
`;

export default function PageBanner(props: PageBannerProps) {
    const {theme} = useTheme();
    const {title, description} = props;
    return(
        <HeaderWrapper {...props} px={[20, 50]} py={[30, 70]} mb={40} flexDirection="column" alignItems="center" justifyContent="center">
            <Head as="h1" color={theme.colors.primary}>{title}</Head>
            <Text textAlign="center" color="white">{description}</Text>
        </HeaderWrapper>
    )

}