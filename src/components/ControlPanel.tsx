import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import {
  setGameMode,
  setPlayerColor,
  setAIDifficulty,
  resetGame,
  undoMove,
  setTutorialMode,
  setShowRulesModal,
  setBoardSize
} from '../store/gameSlice'
import { toggleTheme } from '../store/themeSlice'
import type { PlayerColor, AIDifficulty, GameState, RootState, ThemeState, BoardSize } from '../types'

const Panel = styled.div`
  background-color: ${props => props.theme.secondaryColor};
  padding: 1.5rem;
  border-radius: 8px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const GameTitle = styled.h1`
  margin: 0 0 1rem 0;
  color: white;
  text-align: center;
  font-size: 2rem;
`

const Title = styled.h3`
  margin: 0;
  color: ${props => props.theme.textColor};
`

const ColorOptions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`

interface ColorButtonProps {
  color: string
  isSelected: boolean
}

const ColorButton = styled.button<ColorButtonProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.color};
  border: 2px solid ${props => (props.isSelected ? 'white' : 'transparent')};
  padding: 0;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    background-color: ${props => props.color};
    filter: brightness(85%);
    border-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`

export const ControlPanel = () => {
  const dispatch = useDispatch()
  const game = useSelector((state: RootState) => state.game as GameState)
  const theme = useSelector((state: RootState) => state.theme as ThemeState)

  const colors: PlayerColor[] = ['red', 'blue', 'green', 'yellow', 'purple', 'orange']
  const difficulties: AIDifficulty[] = ['easy', 'medium', 'hard']

  const handleColorSelect = (player: 1 | 2, color: PlayerColor) => {
    const otherPlayer = player === 1 ? game.player2 : game.player1
    if (color !== otherPlayer.color) {
      dispatch(setPlayerColor({ player, color }))
    }
  }

  return (
    <Panel>
      <GameTitle>Isolation Game</GameTitle>
      
      <Section>
        <Title>Board Size</Title>
        <ButtonGroup>
          <button
            onClick={() => dispatch(setBoardSize(5))}
            style={{ opacity: game.boardSize === 5 ? 1 : 0.6 }}
          >
            5×5 Quick
          </button>
          <button
            onClick={() => dispatch(setBoardSize(7))}
            style={{ opacity: game.boardSize === 7 ? 1 : 0.6 }}
          >
            7×7 Classic
          </button>
          <button
            onClick={() => dispatch(setBoardSize(9))}
            style={{ opacity: game.boardSize === 9 ? 1 : 0.6 }}
          >
            9×9 Strategic
          </button>
          <button
            onClick={() => dispatch(setBoardSize(11))}
            style={{ opacity: game.boardSize === 11 ? 1 : 0.6 }}
          >
            11×11 Epic
          </button>
        </ButtonGroup>
      </Section>

      <Section>
        <Title>Game Mode</Title>
        <ButtonGroup>
          <button
            onClick={() => dispatch(setGameMode('pvp'))}
            style={{ opacity: game.gameMode === 'pvp' ? 1 : 0.6 }}
          >
            Player vs Player
          </button>
          <button
            onClick={() => dispatch(setGameMode('ai'))}
            style={{ opacity: game.gameMode === 'ai' ? 1 : 0.6 }}
          >
            Player vs AI
          </button>
        </ButtonGroup>
      </Section>

      {game.gameMode === 'ai' && (
        <>
          <Section>
            <Title>AI Difficulty</Title>
            <ButtonGroup>
              {difficulties.map(difficulty => (
                <button
                  key={difficulty}
                  onClick={() => dispatch(setAIDifficulty(difficulty))}
                  style={{ opacity: game.aiDifficulty === difficulty ? 1 : 0.6 }}
                >
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </button>
              ))}
            </ButtonGroup>
          </Section>

        </>
      )}

      <Section>
        <Title>Player 1 Color</Title>
        <ColorOptions>
          {colors.map(color => (
            <ColorButton
              key={color}
              color={color}
              isSelected={game.player1.color === color}
              onClick={() => handleColorSelect(1, color)}
            />
          ))}
        </ColorOptions>
      </Section>

      <Section>
        <Title>Player 2 Color</Title>
        <ColorOptions>
          {colors.map(color => (
            <ColorButton
              key={color}
              color={color}
              isSelected={game.player2.color === color}
              onClick={() => handleColorSelect(2, color)}
            />
          ))}
        </ColorOptions>
      </Section>

      <Section>
        <Title>Game Options</Title>
        <ButtonGroup>
          <button onClick={() => dispatch(resetGame())}>New Game</button>
          <button 
            onClick={() => dispatch(undoMove())}
            disabled={game.moveHistory.length === 0 || game.tutorialMode}
          >
            Undo Move
          </button>
          <button onClick={() => dispatch(toggleTheme())}>
            {theme.isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </ButtonGroup>
        <ButtonGroup>
          <button 
            onClick={() => dispatch(setShowRulesModal(true))}
            disabled={game.tutorialMode}
          >
            Rules & Guide
          </button>
          <button 
            onClick={() => dispatch(setTutorialMode(true))}
            disabled={game.tutorialMode}
          >
            Start Tutorial
          </button>
        </ButtonGroup>
      </Section>
    </Panel>
  )
}
