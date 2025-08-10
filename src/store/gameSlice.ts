import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Position, PlayerColor, GameMode, AIDifficulty, GameState } from '../types'

const initialState: GameState = {
  board: Array(7).fill(null).map(() => Array(7).fill(true)),
  currentPlayer: 1,
  player1: {
    color: 'blue',
    position: { row: 0, col: 3 },
    score: 0
  },
  player2: {
    color: 'green',
    position: { row: 6, col: 3 },
    score: 0
  },
  gameMode: 'ai',
  aiDifficulty: 'medium',
  moveHistory: [],
  isGameOver: false,
  showTutorial: true,
  isAIThinking: false,
  tutorialMode: false,
  showRulesModal: false
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPlayerColor: (state, action: PayloadAction<{ player: 1 | 2; color: PlayerColor }>) => {
      const { player, color } = action.payload
      const otherPlayer = player === 1 ? state.player2 : state.player1
      
      if (color !== otherPlayer.color) {
        if (player === 1) {
          state.player1.color = color
        } else {
          state.player2.color = color
        }
      }
    },
    makeMove: (state, action: PayloadAction<{ to: Position; removedSquare: Position | null }>) => {
      const { to, removedSquare } = action.payload
      const currentPlayer = state.currentPlayer === 1 ? state.player1 : state.player2
      const from = { ...currentPlayer.position }

      if (removedSquare) {
        state.board[removedSquare.row][removedSquare.col] = null
      }

      currentPlayer.position = to
      state.moveHistory.push({
        player: state.currentPlayer,
        from,
        to,
        removedSquare
      })

      if (state.moveHistory.length > 20) {
        state.moveHistory.shift()
      }

      if (!removedSquare) {
        return
      }

      state.currentPlayer = state.currentPlayer === 1 ? 2 : 1
    },
    undoMove: (state) => {
      if (state.moveHistory.length === 0) return

      const lastMove = state.moveHistory.pop()!
      if (lastMove.player === 1) {
        state.player1.position = lastMove.from
      } else {
        state.player2.position = lastMove.from
      }

      if (lastMove.removedSquare) {
        state.board[lastMove.removedSquare.row][lastMove.removedSquare.col] = true
        state.currentPlayer = lastMove.player
      }
    },
    setGameMode: (state, action: PayloadAction<GameMode>) => {
      state.gameMode = action.payload
    },
    setAIDifficulty: (state, action: PayloadAction<AIDifficulty>) => {
      state.aiDifficulty = action.payload
    },
    endGame: (state, action: PayloadAction<1 | 2>) => {
      state.isGameOver = true
      if (action.payload === 1) {
        state.player1.score++
      } else {
        state.player2.score++
      }
    },
    resetGame: (state) => {
      state.board = Array(7).fill(null).map(() => Array(7).fill(true))
      state.player1.position = { row: 0, col: 3 }
      state.player2.position = { row: 6, col: 3 }
      state.currentPlayer = 1
      state.moveHistory = []
      state.isGameOver = false
    },
    toggleTutorial: (state) => {
      state.showTutorial = !state.showTutorial
    },
    setAIThinking: (state, action: PayloadAction<boolean>) => {
      state.isAIThinking = action.payload
    },
    setTutorialMode: (state, action: PayloadAction<boolean>) => {
      state.tutorialMode = action.payload
    },
    setShowRulesModal: (state, action: PayloadAction<boolean>) => {
      state.showRulesModal = action.payload
    }
  }
})

export const {
  setPlayerColor,
  makeMove,
  undoMove,
  setGameMode,
  setAIDifficulty,
  endGame,
  resetGame,
  toggleTutorial,
  setAIThinking,
  setTutorialMode,
  setShowRulesModal
} = gameSlice.actions

export default gameSlice.reducer
