import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { toggleTutorial } from '../store/gameSlice'

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const Content = styled(motion.div)`
  background-color: ${props => props.theme.backgroundColor};
  padding: 2rem;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
  color: ${props => props.theme.textColor};
`

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: ${props => props.theme.primaryColor};
`

const Section = styled.div`
  margin-bottom: 1.5rem;
`

const List = styled.ul`
  margin-left: 1.5rem;
  margin-bottom: 1rem;
`

const Button = styled.button`
  margin-top: 1rem;
`

export const Tutorial = () => {
  const dispatch = useDispatch()

  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => dispatch(toggleTutorial())}
    >
      <Content
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <Title>How to Play Isolation</Title>

        <Section>
          <h3>Game Setup</h3>
          <List>
            <li>The game is played on a 7x7 grid</li>
            <li>Each player starts at opposite ends of the board</li>
            <li>Player 1 starts at the top, Player 2 at the bottom</li>
          </List>
        </Section>

        <Section>
          <h3>Game Rules</h3>
          <List>
            <li>Players take turns moving their piece and removing one square</li>
            <li>Pieces can move one space in any direction (like a king in chess)</li>
            <li>After moving, you must remove any square except:
              <ul>
                <li>The square you're currently on</li>
                <li>The square your opponent is on</li>
                <li>A square that has already been removed</li>
              </ul>
            </li>
            <li>You cannot move to a removed square</li>
            <li>The game ends when a player cannot make a legal move</li>
          </List>
        </Section>

        <Section>
          <h3>Controls</h3>
          <List>
            <li>Click your piece to select it</li>
            <li>Click a valid square to move there</li>
            <li>After moving, click any valid square to remove it</li>
            <li>Use the Undo button to take back moves (up to 10)</li>
          </List>
        </Section>

        <Button onClick={() => dispatch(toggleTutorial())}>Got it!</Button>
      </Content>
    </Overlay>
  )
}
