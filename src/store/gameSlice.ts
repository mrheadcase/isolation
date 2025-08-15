import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Position, PlayerColor, GameMode, AIDifficulty, GameState, BoardSize } from '../types'

// Helper function to create a board of specified size
const createBoard = (size: BoardSize): (boolean | null)[][] => {
  return Array(size).fill(null).map(() => Array(size).fill(true))
}

// Helper function to get starting positions for different board sizes
const getStartingPositions = (size: BoardSize) => {
  const center = Math.floor(size / 2)
  return {
    player1: { row: 0, col: center },
    player2: { row: size - 1, col: center }
  }
}

const initialState: GameState = {
  board: createBoard(7),
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
  winner: null,
  boardSize: 7,
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
      state.winner = action.payload
      if (action.payload === 1) {
        state.player1.score++
      } else {
        state.player2.score++
      }
    },
    setBoardSize: (state, action: PayloadAction<BoardSize>) => {
      const newSize = action.payload
      const positions = getStartingPositions(newSize)
      
      // Reset the entire game with new board size
      state.boardSize = newSize
      state.board = createBoard(newSize)
      state.player1.position = positions.player1
      state.player2.position = positions.player2
      state.currentPlayer = 1
      state.isGameOver = false
      state.winner = null
      state.moveHistory = []
      state.isAIThinking = false
    },
    resetGame: (state) => {
      const positions = getStartingPositions(state.boardSize)
      state.board = createBoard(state.boardSize)
      state.player1.position = positions.player1
      state.player2.position = positions.player2
      state.currentPlayer = 1
      state.moveHistory = []
      state.isGameOver = false
      state.winner = null
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
  setBoardSize,
  toggleTutorial,
  setAIThinking,
  setTutorialMode,
  setShowRulesModal
} = gameSlice.actions

export default gameSlice.reducer
