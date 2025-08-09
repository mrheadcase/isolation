import 'styled-components'
import { Theme } from '../types'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    cellBackground: string
    cellBackgroundHover: string
    cellBackgroundDisabled: string
    player1Color: string
    player2Color: string
  }
}
