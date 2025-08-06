export interface Position {
  row: number
  col: number
}

export type PlayerColor = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange'
export type GameMode = 'pvp' | 'ai'
export type AIDifficulty = 'easy' | 'medium' | 'hard'

export interface Player {
  color: PlayerColor
  position: Position
  score: number
}

export interface Move {
  player: 1 | 2
  from: Position
  to: Position
  removedSquare: Position | null
}

export interface GameState {
  board: (boolean | null)[][]
  currentPlayer: 1 | 2
  player1: Player
  player2: Player
  gameMode: GameMode
  aiDifficulty: AIDifficulty
  moveHistory: Move[]
  isGameOver: boolean
  showTutorial: boolean
  isAIThinking: boolean
}

export interface ThemeState {
  isDarkMode: boolean
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  textColor: string
}

export interface RootState {
  game: GameState
  theme: ThemeState
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
