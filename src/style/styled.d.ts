// eslint-disable-next-line import/no-unresolved
import { PonyTheme } from '@ponyswapdex/uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PonyTheme {}
}
