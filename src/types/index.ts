export interface Position {
  row: number
  col: number
}

export interface Player {
  color: PlayerColor
  position: Position
  score: number
}

export type PlayerColor = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange'
export type GameMode = 'pvp' | 'ai'
export type AIDifficulty = 'easy' | 'medium' | 'hard'
export type AIStyle = 'aggressive' | 'defensive' | 'balanced'

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
  aiStyle: AIStyle
  moveHistory: Move[]
  isGameOver: boolean
  showTutorial: boolean
}

export interface RootState {
  game: GameState
  theme: {
    isDarkMode: boolean
    primaryColor: string
    secondaryColor: string
    backgroundColor: string
    textColor: string
  }
}
