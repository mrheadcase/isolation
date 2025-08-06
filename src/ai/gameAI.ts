import { Position } from '../types'

const directions = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1]
]

// Calculate the Manhattan distance to the center of the board
const distanceToCenter = (pos: Position): number => {
  const centerRow = 3
  const centerCol = 3
  return Math.abs(pos.row - centerRow) + Math.abs(pos.col - centerCol)
}

// Count available adjacent squares
const countAvailableAdjacent = (pos: Position, board: (boolean | null)[][]): number => {
  let count = 0
  for (const [dx, dy] of directions) {
    const newRow = pos.row + dx
    const newCol = pos.col + dy
    if (
      newRow >= 0 && newRow < board.length &&
      newCol >= 0 && newCol < board[0].length &&
      board[newRow][newCol] !== null
    ) {
      count++
    }
  }
  return count
}

// Get distance between two positions
const getDistance = (pos1: Position, pos2: Position): number => {
  return Math.abs(pos1.row - pos2.row) + Math.abs(pos1.col - pos2.col)
}

export const selectAIMove = (
  currentPosition: Position,
  playerPosition: Position,
  board: (boolean | null)[][]
): Position => {
  let bestMove: Position | null = null
  let bestScore = -Infinity

  // Try all possible moves
  for (const [dx, dy] of directions) {
    const newRow = currentPosition.row + dx
    const newCol = currentPosition.col + dy
    
    // Check if move is valid and not occupied by player
    if (
      newRow >= 0 && newRow < board.length &&
      newCol >= 0 && newCol < board[0].length &&
      board[newRow][newCol] !== null &&
      !(newRow === playerPosition.row && newCol === playerPosition.col)
    ) {
      const pos = { row: newRow, col: newCol }
      
      // Calculate score based on:
      // 1. Distance to center (closer is better)
      // 2. Number of available adjacent squares (more is better)
      // 3. Distance to player (farther is slightly better to avoid immediate capture)
      const distCenter = distanceToCenter(pos)
      const adjacentSquares = countAvailableAdjacent(pos, board)
      const distToPlayer = getDistance(pos, playerPosition)
      
      const score = adjacentSquares * 2 - distCenter + distToPlayer * 0.5
      
      if (score > bestScore) {
        bestScore = score
        bestMove = pos
      }
    }
  }

  return bestMove || currentPosition // fallback to current position if no valid moves
}

export const selectAIRemoval = (
  aiPosition: Position,
  playerPosition: Position,
  board: (boolean | null)[][]
): Position => {
  const isStartingSquare = (row: number, col: number) => 
    (row === 0 && col === 3) || (row === 6 && col === 3)

  // First, look for squares one step away from the player
  for (const [dx, dy] of directions) {
    const row = playerPosition.row + dx
    const col = playerPosition.col + dy
    
    if (
      row >= 0 && row < board.length &&
      col >= 0 && col < board[0].length &&
      board[row][col] === true && // square exists and hasn't been removed
      !isStartingSquare(row, col) && // not a starting square
      !(row === aiPosition.row && col === aiPosition.col) && // not AI's position
      !(row === playerPosition.row && col === playerPosition.col) // not player's position
    ) {
      return { row, col }
    }
  }

  // If no squares adjacent to player, find any valid removable square
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (
        board[i][j] === true && // square exists and hasn't been removed
        !(i === aiPosition.row && j === aiPosition.col) && // not AI's position
        !(i === playerPosition.row && j === playerPosition.col) // not player's position
      ) {
        return { row: i, col: j }
      }
    }
  }

  // Fallback to first valid square (shouldn't reach here in normal gameplay)
  return { row: 0, col: 0 }
}
