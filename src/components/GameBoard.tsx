import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { AppDispatch } from '../store'
import styled, { DefaultTheme } from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import type { RootState } from '../types'
import type { GameMode, AIDifficulty } from '../store/gameSlice'
import { makeMove, undoMove, endGame } from '../store/gameSlice'
import { VictoryModal } from './VictoryModal'
import { selectAIMove, selectAIRemoval } from '../ai/gameAI'
import '../index.css'

// Theme interface to extend the default theme
declare module 'styled-components' {
  export interface DefaultTheme {
    primaryColor: string;
    secondaryColor: string;
  }
}

// Game related types
export type Position = {
  row: number;
  col: number;
}

export type PlayerColor = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange'

export interface Player {
  color: PlayerColor;
  position: Position;
  score: number;
}

export interface GameState {
  board: (boolean | null)[][];
  currentPlayer: 1 | 2;
  player1: Player;
  player2: Player;
  isGameOver: boolean;
  moveHistory: Array<{
    to: Position;
    removedSquare: Position | null;
  }>;
  gameMode: GameMode;
  aiDifficulty: AIDifficulty;
  isAIThinking: boolean;
}

interface CellProps {
  isActive: boolean;
  isPlayer1: boolean;
  isPlayer2: boolean;
  isValid: boolean;
  isSelected: boolean;
  canBeRemoved: boolean;
  isStartingSquare: boolean;
}

interface CellComponentProps extends CellProps {
  onClick: () => void;
  whileHover?: any;
  whileTap?: any;
}

const BoardContainer = styled.div<{ theme: DefaultTheme }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`

const Board = styled.div<{ theme: DefaultTheme }>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  padding: 8px;
  background-color: ${props => props.theme.secondaryColor};
  border-radius: 8px;
  width: min(80vh, 80vw);
  height: min(80vh, 80vw);
`

const Controls = styled.div<{ theme: DefaultTheme }>`
  display: flex;
  gap: 16px;
  margin-top: 16px;
`

const ScoreBoard = styled.div<{ theme: DefaultTheme }>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: min(80vh, 80vw);
  margin-bottom: 16px;
`

const PlayerScore = styled.div<{ isActive: boolean; color: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: ${props => props.theme.secondaryColor};
  opacity: ${props => props.isActive ? 1 : 0.7};
  transition: opacity 0.3s ease;

  .score {
    font-size: 24px;
    font-weight: bold;
    color: ${props => props.color};
  }

  .label {
    font-size: 14px;
    color: ${props => props.theme.textColor};
  }
`

const GameStatus = styled.div<{ theme: DefaultTheme }>`
  font-size: 19px;
  margin-bottom: 16px;
  text-align: center;
`

const RemoveX = styled.div<{ theme: DefaultTheme }>`
  color: red;
  font-size: 24px;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
`

const PlayerPiece = styled.div<{ color: string; theme: DefaultTheme }>`
  position: absolute;
  width: 80%;
  height: 80%;
  border-radius: 50%;
  background-color: ${props => props.color};
  transition: all 0.2s ease-in-out;
`

const CellContainer = styled(motion.div)<CellProps & { theme: DefaultTheme }>`
  aspect-ratio: 1;
  position: relative;
  background-color: ${props =>
    props.isStartingSquare
      ? '#FFD700 !important' // Solid gold color for starting squares with !important to override hover states
      : props.isActive
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.3)'};
  border-radius: 4px;
  cursor: ${props => (props.isActive ? 'pointer' : 'not-allowed')};
  border: 2px solid ${props =>
    props.isStartingSquare
      ? '#DAA520 !important' // Darker gold border with !important
      : props.isSelected
      ? props.theme.primaryColor
      : props.isValid
      ? 'rgba(255, 255, 255, 0.5)'
      : 'transparent'};
  &:hover {
    background-color: ${props =>
      props.isStartingSquare
        ? '#FFD700 !important'
        : props.isActive
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(0, 0, 0, 0.3)'};
  }
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: ${props => (props.isActive ? 'scale(0.95)' : 'none')};
    background-color: ${props =>
      props.isValid ? 'rgba(255, 255, 255, 0.2)' : props.isActive ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.3)'};
  }
`

enum TurnPhase {
  SELECT_PIECE,
  SELECT_MOVE,
  SELECT_REMOVE
}

interface CellComponentProps extends CellProps {
  onClick: () => void;
  whileHover?: any;
  whileTap?: any;
}

const Cell: React.FC<CellComponentProps> = (props) => {
  const game = useSelector((state: RootState) => state.game)
  
  return (
    <CellContainer {...props}>
      {props.isPlayer1 && <PlayerPiece color={game.player1.color} />}
      {props.isPlayer2 && <PlayerPiece color={game.player2.color} />}
      {props.canBeRemoved && <RemoveX>×</RemoveX>}
    </CellContainer>
  )
}

export const GameBoard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const game = useSelector((state: RootState) => state.game as GameState)
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null)
  const [moveToPosition, setMoveToPosition] = useState<Position | null>(null)
  const [turnPhase, setTurnPhase] = useState<TurnPhase>(TurnPhase.SELECT_PIECE)

  const handleCellClick = (row: number, col: number) => {
    if (game.isGameOver) return

    const currentPlayer = game.currentPlayer === 1 ? game.player1 : game.player2
    const clickedPosition = { row, col }

    switch (turnPhase) {
      case TurnPhase.SELECT_PIECE:
        // Can only select current player's piece
        if (row === currentPlayer.position.row && col === currentPlayer.position.col) {
          setSelectedPosition(clickedPosition)
          setTurnPhase(TurnPhase.SELECT_MOVE)
        }
        break

      case TurnPhase.SELECT_MOVE:
        if (checkValidMove(clickedPosition, currentPlayer.position, game.board)) {
          // First move the piece
          dispatch(
            makeMove({
              to: clickedPosition,
              removedSquare: null // We'll update this in the remove phase
            })
          )
          setMoveToPosition(clickedPosition)
          setTurnPhase(TurnPhase.SELECT_REMOVE)
        } else if (row === currentPlayer.position.row && col === currentPlayer.position.col) {
          // Clicking own piece again deselects it
          setSelectedPosition(null)
          setTurnPhase(TurnPhase.SELECT_PIECE)
        }
        break

      case TurnPhase.SELECT_REMOVE:
        if (canRemoveSquare(clickedPosition, game.board, moveToPosition!, moveToPosition!)) {
          // Update the move with the removed square
          dispatch(
            makeMove({
              to: moveToPosition!,
              removedSquare: clickedPosition
            })
          )
          setSelectedPosition(null)
          setMoveToPosition(null)
          setTurnPhase(TurnPhase.SELECT_PIECE)
        }
        break
    }
  }

  const handleUndo = () => {
    dispatch(undoMove())
    setSelectedPosition(null)
    setMoveToPosition(null)
    setTurnPhase(TurnPhase.SELECT_PIECE)
  }

  const checkValidMove = (to: Position, from: Position, board: (boolean | null)[][]) => {
    // Check if the target square is removed
    if (!board[to.row][to.col]) return false

    // Check if opponent is in the target square
    const otherPlayerPos = game.currentPlayer === 1 ? game.player2.position : game.player1.position
    if (to.row === otherPlayerPos.row && to.col === otherPlayerPos.col) return false

    // Check if the move is one square in any direction
    const rowDiff = Math.abs(to.row - from.row)
    const colDiff = Math.abs(to.col - from.col)
    return rowDiff <= 1 && colDiff <= 1 && (rowDiff !== 0 || colDiff !== 0)
  }

  const canRemoveSquare = (pos: Position, board: (boolean | null)[][], _: Position, newPos: Position) => {
    // Can't remove:
    // - null squares
    // - other player's position (which is still at currentPos)
    // - the square we just moved to (newPos)
    // - starting positions
    const otherPlayerPos = game.currentPlayer === 1 ? game.player2.position : game.player1.position
    return board[pos.row][pos.col] === true && 
           !(pos.row === otherPlayerPos.row && pos.col === otherPlayerPos.col) &&
           !(pos.row === newPos.row && pos.col === newPos.col) &&
           !isStartingPosition(pos)
  }

  const isStartingPosition = (pos: Position) => {
    return (pos.row === 0 && pos.col === 3) || (pos.row === 6 && pos.col === 3)
  }

  const hasValidMoves = (playerPosition: Position) => {
    // Check all adjacent squares
    for (let row = Math.max(0, playerPosition.row - 1); row <= Math.min(6, playerPosition.row + 1); row++) {
      for (let col = Math.max(0, playerPosition.col - 1); col <= Math.min(6, playerPosition.col + 1); col++) {
        // Skip the current position
        if (row === playerPosition.row && col === playerPosition.col) continue;
        
        // If there's a valid move available, return true
        if (game.board[row][col] === true) {
          return true;
        }
      }
    }
    return false;
  }

  // Check for game over after each move completion
  React.useEffect(() => {
    if (game.isGameOver) return;

    const currentPlayerPos = game.currentPlayer === 1 ? game.player1.position : game.player2.position;
    
    // If current player has no valid moves, other player wins
    if (!hasValidMoves(currentPlayerPos)) {
      const winner = game.currentPlayer === 1 ? 2 : 1;
      dispatch(endGame(winner));
      return;
    }

    // Handle AI turn
    const handleAIMove = async () => {
      if (game.gameMode === 'ai' && game.currentPlayer === 2) {
        // Wait before AI moves
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Calculate and execute AI move
        const aiMove = selectAIMove(
          game.player2.position,
          game.player1.position,
          game.board
        );
        
        dispatch(makeMove({
          to: aiMove,
          removedSquare: null
        }));
        
        // Wait before removing square
        await new Promise(resolve => setTimeout(resolve, 400));
        
        // Calculate and execute square removal
        const squareToRemove = selectAIRemoval(
          aiMove,
          game.player1.position,
          game.board
        );
        
        dispatch(makeMove({
          to: aiMove,
          removedSquare: squareToRemove
        }));
      }
    };

    handleAIMove();
  }, [game.currentPlayer, game.board, game.gameMode]);

  const [showVictoryModal, setShowVictoryModal] = useState(false)

  // Show victory modal when game ends
  React.useEffect(() => {
    if (game.isGameOver) {
      setShowVictoryModal(true)
    }
  }, [game.isGameOver])

  return (
    <BoardContainer>
      <ScoreBoard>
        <PlayerScore
          isActive={game.currentPlayer === 1}
          color={game.player1.color}
        >
          <div className="score">{game.player1.score}</div>
          <div className="label">Player 1</div>
        </PlayerScore>
        <GameStatus>
          {game.isGameOver
            ? `Game Over! ${game.currentPlayer === 1 ? 'Player 2' : 'Player 1'} Wins!`
            : `${game.currentPlayer === 1 ? 'Player 1' : 'Player 2'}'s Turn`}
        </GameStatus>
        <PlayerScore
          isActive={game.currentPlayer === 2}
          color={game.player2.color}
        >
          <div className="score">{game.player2.score}</div>
          <div className="label">Player 2</div>
        </PlayerScore>
      </ScoreBoard>
      <AnimatePresence>
        {showVictoryModal && (
          <VictoryModal
            winner={game.currentPlayer === 1 ? 2 : 1}
            onClose={() => setShowVictoryModal(false)}
          />
        )}
      </AnimatePresence>
      <Board>
        {game.board.map((row: (boolean | null)[], i: number) =>
          row.map((cell: boolean | null, j: number) => {
            const currentPlayer = game.currentPlayer === 1 ? game.player1 : game.player2
            const pos = { row: i, col: j }
            const isValidMove = turnPhase === TurnPhase.SELECT_MOVE && 
              selectedPosition && checkValidMove(pos, currentPlayer.position, game.board)
            const canBeRemoved = turnPhase === TurnPhase.SELECT_REMOVE && 
              moveToPosition && canRemoveSquare(pos, game.board, currentPlayer.position, moveToPosition)

            return (
              <Cell
                key={`${i}-${j}`}
                isActive={cell !== null}
                isPlayer1={i === game.player1.position.row && j === game.player1.position.col}
                isPlayer2={i === game.player2.position.row && j === game.player2.position.col}
                isSelected={selectedPosition?.row === i && selectedPosition?.col === j}
                isValid={isValidMove || false}
                canBeRemoved={canBeRemoved || false}
                isStartingSquare={(i === 0 && j === 3) || (i === 6 && j === 3)}
                onClick={() => handleCellClick(i, j)}
                whileHover={{ 
                  scale: ((cell !== null && (isValidMove || canBeRemoved)) && !((i === 0 && j === 3) || (i === 6 && j === 3))) ? 0.95 : 1,
                  transition: { duration: 0 }
                }}
                whileTap={{ 
                  scale: ((cell !== null && (isValidMove || canBeRemoved)) && !((i === 0 && j === 3) || (i === 6 && j === 3))) ? 0.9 : 1,
                  transition: { duration: 0 }
                }}
              />
            );
          })
        )}
      </Board>
      <Controls>
        <button onClick={handleUndo} disabled={game.moveHistory.length === 0}>
          Undo Move
        </button>
      </Controls>
    </BoardContainer>
  );
}
