import { Position, AIDifficulty } from '../types'

const directions = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1]
]

// Calculate the Manhattan distance to the center of the board
const distanceToCenter = (pos: Position, boardSize: number): number => {
  const centerRow = Math.floor(boardSize / 2)
  const centerCol = Math.floor(boardSize / 2)
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
  board: (boolean | null)[][],
  boardSize: number,
  difficulty: AIDifficulty = 'medium'
): Position => {
  let bestMove: Position | null = null
  let bestScore = -Infinity

  // Collect all valid moves
  const validMoves: { pos: Position; score: number }[] = []

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
      const distCenter = distanceToCenter(pos, boardSize)
      const adjacentSquares = countAvailableAdjacent(pos, board)
      const distToPlayer = getDistance(pos, playerPosition)
      
      let score = adjacentSquares * 2 - distCenter + distToPlayer * 0.5
      
      // Adjust strategy based on difficulty
      switch (difficulty) {
        case 'easy':
          // Easy AI: Add randomness and make some poor decisions
          score += (Math.random() - 0.5) * 4 // Random factor
          score -= adjacentSquares * 0.5 // Sometimes choose worse mobility
          break
          
        case 'medium':
          // Medium AI: Balanced strategy (current implementation)
          score += (Math.random() - 0.5) * 1 // Small random factor
          break
          
        case 'hard':
          // Hard AI: Better strategic planning
          score += adjacentSquares * 0.5 // Extra weight on mobility
          score += distToPlayer * 0.3 // Better at maintaining distance
          // Prefer center control more on larger boards
          if (boardSize > 7) {
            score -= distCenter * 0.5
          }
          break
      }
      
      validMoves.push({ pos, score })
      
      if (score > bestScore) {
        bestScore = score
        bestMove = pos
      }
    }
  }

  // Easy difficulty sometimes makes suboptimal moves
  if (difficulty === 'easy' && validMoves.length > 1 && Math.random() < 0.3) {
    // 30% chance to pick a random move instead of the best one
    const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)]
    return randomMove.pos
  }

  return bestMove || currentPosition // fallback to current position if no valid moves
}

export const selectAIRemoval = (
  aiPosition: Position,
  playerPosition: Position,
  board: (boolean | null)[][],
  boardSize: number,
  difficulty: AIDifficulty = 'medium'
): Position => {
  const isStartingSquare = (row: number, col: number) => {
    const center = Math.floor(boardSize / 2)
    return (row === 0 && col === center) || (row === boardSize - 1 && col === center)
  }

  const validRemovalSquares: Position[] = []

  // Collect all valid removal squares
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (
        board[i][j] === true && // square exists and hasn't been removed
        !isStartingSquare(i, j) && // not a starting square
        !(i === aiPosition.row && j === aiPosition.col) && // not AI's position
        !(i === playerPosition.row && j === playerPosition.col) // not player's position
      ) {
        validRemovalSquares.push({ row: i, col: j })
      }
    }
  }

  if (validRemovalSquares.length === 0) {
    // Fallback to first valid square (shouldn't reach here in normal gameplay)
    return { row: 0, col: 0 }
  }

  // Strategy based on difficulty
  switch (difficulty) {
    case 'easy':
      // Easy AI: Random removal or sometimes poor choices
      if (Math.random() < 0.4) {
        // 40% chance to pick a completely random square
        return validRemovalSquares[Math.floor(Math.random() * validRemovalSquares.length)]
      }
      // Otherwise fall through to basic strategy
      break

    case 'hard':
      // Hard AI: Advanced removal strategy
      // Prioritize squares that reduce player mobility
      let bestRemoval: Position | null = null
      let worstPlayerMobility = Infinity

      for (const square of validRemovalSquares) {
        // Temporarily remove this square to test player mobility
        const tempBoard = board.map(row => [...row])
        tempBoard[square.row][square.col] = null

        // Count how many moves the player would have after this removal
        let playerMobility = 0
        for (const [dx, dy] of directions) {
          const newRow = playerPosition.row + dx
          const newCol = playerPosition.col + dy
          if (
            newRow >= 0 && newRow < tempBoard.length &&
            newCol >= 0 && newCol < tempBoard[0].length &&
            tempBoard[newRow][newCol] !== null &&
            !(newRow === aiPosition.row && newCol === aiPosition.col)
          ) {
            playerMobility++
          }
        }

        // Prefer squares that most limit player mobility
        if (playerMobility < worstPlayerMobility) {
          worstPlayerMobility = playerMobility
          bestRemoval = square
        }
      }

      if (bestRemoval) {
        return bestRemoval
      }
      break
  }

  // Medium AI and fallback: Look for squares adjacent to player (current strategy)
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

  // If no squares adjacent to player, return first valid square
  return validRemovalSquares[0]
}
