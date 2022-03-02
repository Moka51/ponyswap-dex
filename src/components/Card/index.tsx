import React from 'react'
import styled from 'styled-components'
import { Text, Card as CardUI} from '@ponyswapdex/uikit'

const Card = styled.div<any>`
  width: 100%;
  border-radius: 16px;
  padding: 1.25rem;
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`
export default Card

export const LightCard = styled(Card)`
  border: 1px solid ${({ theme }) => theme.colors.invertedContrast};
  background-color: ${({ theme }) => theme.colors.invertedContrast};
`

export const GreyCard = styled(Card)`
  background-color: ${({ theme }) => theme.colors.tertiary};
`

export const OutlineCard = styled(Card)`
  border: 1px solid ${({ theme }) => theme.colors.tertiary};
`

export const YellowCard = styled(Card)`
  background-color: rgba(243, 132, 30, 0.05);
  color: ${({ theme }) => theme.colors.binance};
  font-weight: 500;
`

export const PinkCard = styled(Card)`
  background-color: rgba(255, 0, 122, 0.03);
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`

const BlueCardStyled = styled(Card)`
  background-color: ${({ theme }) => theme.colors.primaryDark};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  width: fit-content;
`
export const DisabledCard = styled(CardUI)<{message: string}>`
  position: relative;
  &::before{
    content: ${({ message }) => `"${message}"`};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 9999;
  }
`



export const BlueCard = ({ children, ...rest }: any) => {
  return (
    <BlueCardStyled {...rest}>
      <Text color="#24c7d6">{children}</Text>
    </BlueCardStyled>
  )
}
