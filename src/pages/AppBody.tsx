import React from 'react'
import styled from 'styled-components'
import { Card } from '@ponyswapdex/uikit'

export const BodyWrapper = styled(Card)<{maxWidth: string}>`
  position: relative;
  max-width: ${({ maxWidth }) => maxWidth};
  width: 100%;
  z-index: 5;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children, maxWidth}: { children: React.ReactNode, maxWidth?: string }) {
  return <BodyWrapper maxWidth={maxWidth ?? '436px'}>{children}</BodyWrapper>
}
