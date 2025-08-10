import React, { useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

const TutorialOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TutorialContent = styled(motion.div)`
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.textColor};
  padding: 32px;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  border: 2px solid ${props => props.theme.primaryColor};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`

const Title = styled.h2`
  color: ${props => props.theme.primaryColor};
  margin-bottom: 16px;
  font-size: 24px;
`

const Description = styled.p`
  margin-bottom: 24px;
  line-height: 1.6;
  font-size: 16px;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
`

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  background-color: ${props => props.variant === 'primary' ? props.theme.primaryColor : props.theme.secondaryColor};
  color: ${props => props.theme.textColor};
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`

interface SimpleTutorialProps {
  isActive: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

export const SimpleTutorial: React.FC<SimpleTutorialProps> = ({ isActive, onComplete, onSkip }) => {
  // Add ESC key support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isActive) {
        onSkip()
      }
    }

    if (isActive) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isActive, onSkip])

  if (!isActive) return null

  return (
    <AnimatePresence>
      <TutorialOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onSkip}
      >
        <TutorialContent
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
          <Title>🎮 Welcome to Isolation!</Title>
          <Description>
            <strong>Goal:</strong> Be the last player who can make a move!
            <br /><br />
            <strong>How to play:</strong>
            <br />
            1. Move your piece one square in any direction
            <br />
            2. Remove any square from the board (except starting squares)
            <br />
            3. Trap your opponent so they can't move!
            <br /><br />
            <strong>Golden squares</strong> are starting positions and cannot be removed.
            <br />
            <strong>Valid moves</strong> are highlighted when you select your piece.
          </Description>
          
          <ButtonContainer>
            <Button onClick={onSkip}>
              Got it!
            </Button>
            <Button variant="primary" onClick={onComplete}>
              Start Playing
            </Button>
          </ButtonContainer>
        </TutorialContent>
      </TutorialOverlay>
    </AnimatePresence>
  )
}
