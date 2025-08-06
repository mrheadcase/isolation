import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    isDarkMode: boolean
    backgroundColor: string
    textColor: string
    primaryColor: string
    secondaryColor: string
    boardBackground: string
    cellBackground: string
    cellBackgroundHover: string
    cellBackgroundDisabled: string
    player1Color: string
    player2Color: string
  }
}
