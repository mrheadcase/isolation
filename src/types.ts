import { ThemeState } from './store/themeSlice'
import { GameState } from './store/gameSlice'

export interface RootState {
  theme: ThemeState
  game: GameState
}

export interface Theme {
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
