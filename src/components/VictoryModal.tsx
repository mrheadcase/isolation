import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import ReactConfetti from 'react-confetti'
import { useDispatch } from 'react-redux'
import { resetGame } from '../store/gameSlice'

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const Content = styled(motion.div)`
  background-color: ${props => props.theme.backgroundColor};
  padding: 2.5rem;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  color: ${props => props.theme.textColor};
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
`

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: ${props => props.theme.primaryColor};
  font-size: 2rem;
`

const Message = styled.p`
  margin-bottom: 2rem;
  font-size: 1.2rem;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  min-width: 120px;

  &:hover {
    transform: translateY(-2px);
  }
`

interface VictoryModalProps {
  winner: 1 | 2;
  onClose: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({ winner, onClose }) => {
  const dispatch = useDispatch()

  const handleNewGame = () => {
    dispatch(resetGame())
    onClose()
  }

  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ReactConfetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={200}
        recycle={false}
        gravity={0.2}
      />
      <Content
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <Title>🎉 Victory! 🎉</Title>
        <Message>
          Player {winner} has won the game!
        </Message>
        <ButtonGroup>
          <Button onClick={handleNewGame}>
            New Game
          </Button>
          <Button onClick={onClose}>
            Close
          </Button>
        </ButtonGroup>
      </Content>
    </Overlay>
  )
}
