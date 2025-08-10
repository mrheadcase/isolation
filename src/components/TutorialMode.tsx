import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import type { RootState } from '../types'
import type { Position } from './GameBoard'

const TutorialOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
  pointer-events: auto;
`

const TutorialHighlight = styled(motion.div)<{ position: { top: string; left: string; width: string; height: string } }>`
  position: absolute;
  top: ${props => props.position.top};
  left: ${props => props.position.left};
  width: ${props => props.position.width};
  height: ${props => props.position.height};
  border: 3px solid #FFE55C;
  border-radius: 8px;
  background-color: rgba(255, 229, 92, 0.2);
  z-index: 60;
  pointer-events: none;
  box-shadow: 0 0 20px rgba(255, 229, 92, 0.5);
`

const TutorialTooltip = styled(motion.div)<{ position: { top: string; left: string; transform?: string } }>`
  position: fixed;
  top: ${props => props.position.top};
  left: ${props => props.position.left};
  transform: ${props => props.position.transform || 'none'};
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.textColor};
  padding: 16px;
  border-radius: 8px;
  max-width: 400px;
  z-index: 70;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 2px solid ${props => props.theme.primaryColor};
  pointer-events: auto;

  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 20px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid ${props => props.theme.primaryColor};
  }
`

const TutorialControls = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
  justify-content: flex-end;
`

const TutorialButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: ${props => props.variant === 'primary' ? props.theme.primaryColor : props.theme.secondaryColor};
  color: ${props => props.theme.textColor};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  margin-bottom: 12px;
  overflow: hidden;
`

const ProgressFill = styled(motion.div)`
  height: 100%;
  background-color: ${props => props.theme.primaryColor};
  border-radius: 2px;
`

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  highlight?: {
    selector: string;
    position: Position;
  };
  action?: 'click' | 'move' | 'remove';
  expectedMove?: Position;
  autoAdvance?: boolean;
  canSkip?: boolean;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Isolation!',
    description: 'In this tutorial, you\'ll learn how to play Isolation step by step. Each player tries to trap their opponent by removing squares from the board.',
    canSkip: true
  },
  {
    id: 'board-overview',
    title: 'The Game Board',
    description: 'This is a 7x7 board. You are the red piece at the top, and your opponent is the blue piece at the bottom. The goal is to make the last legal move!',
    canSkip: true
  },
  {
    id: 'select-piece',
    title: 'Select Your Piece',
    description: 'First, click on your red piece to select it. You\'ll see valid moves highlighted.',
    highlight: {
      selector: 'player-piece',
      position: { row: 0, col: 3 }
    },
    action: 'click',
    expectedMove: { row: 0, col: 3 }
  },
  {
    id: 'make-move',
    title: 'Make Your Move',
    description: 'Now click on any highlighted square to move there. You can move one space in any direction (like a king in chess).',
    action: 'move',
    canSkip: false
  },
  {
    id: 'remove-square',
    title: 'Remove a Square',
    description: 'After moving, you must remove one square from the board. Click on any square that isn\'t occupied by a player. Removed squares turn dark and can\'t be used again.',
    action: 'remove',
    canSkip: false
  },
  {
    id: 'strategy-tip',
    title: 'Strategy Tip',
    description: 'Try to limit your opponent\'s movement options while keeping yours open. The golden starting squares are safe - they can never be removed!',
    canSkip: true
  },
  {
    id: 'win-condition',
    title: 'How to Win',
    description: 'The game ends when a player has no legal moves. The last player who can move wins! Try to trap your opponent while keeping escape routes for yourself.',
    canSkip: true
  },
  {
    id: 'complete',
    title: 'Tutorial Complete!',
    description: 'You\'re ready to play! Remember: move strategically, block your opponent, and keep your options open. Good luck!',
    autoAdvance: true
  }
]

interface TutorialModeProps {
  isActive: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

export const TutorialMode: React.FC<TutorialModeProps> = ({ isActive, onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isWaitingForAction, setIsWaitingForAction] = useState(false)
  const game = useSelector((state: RootState) => state.game)

  const step = tutorialSteps[currentStep]
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100

  useEffect(() => {
    if (step?.autoAdvance) {
      const timer = setTimeout(() => {
        if (currentStep < tutorialSteps.length - 1) {
          setCurrentStep(prev => prev + 1)
        } else {
          onComplete()
        }
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [currentStep, step?.autoAdvance, onComplete])

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(prev => prev + 1)
      setIsWaitingForAction(false)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
      setIsWaitingForAction(false)
    }
  }

  const handleSkip = () => {
    if (step?.canSkip) {
      onSkip()
    }
  }

  const getHighlightPosition = () => {
    if (!step?.highlight) return null

    // Calculate position based on board layout
    const boardSize = Math.min(window.innerHeight * 0.8, window.innerWidth * 0.8)
    const cellSize = boardSize / 7
    const boardOffset = (window.innerWidth - boardSize) / 2

    const { row, col } = step.highlight.position
    return {
      top: `${100 + row * cellSize}px`,
      left: `${boardOffset + col * cellSize}px`,
      width: `${cellSize}px`,
      height: `${cellSize}px`
    }
  }

  const getTooltipPosition = () => {
    // For now, always center the tooltip
    return {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }
  }

  if (!isActive) return null

  return (
    <AnimatePresence>
      <TutorialOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      
      <TutorialTooltip
        position={getTooltipPosition()}
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        <ProgressBar>
          <ProgressFill
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </ProgressBar>

        <h3 style={{ margin: '0 0 12px 0', color: '#FFE55C' }}>
          {step?.title}
        </h3>
        
        <p style={{ margin: '0 0 12px 0', lineHeight: '1.5' }}>
          {step?.description}
        </p>

        <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '12px' }}>
          Step {currentStep + 1} of {tutorialSteps.length}
        </div>

        <TutorialControls>
          {currentStep > 0 && (
            <TutorialButton onClick={handlePrevious}>
              Previous
            </TutorialButton>
          )}
          
          {step?.canSkip && (
            <TutorialButton onClick={handleSkip}>
              Skip Tutorial
            </TutorialButton>
          )}
          
          {!step?.autoAdvance && !isWaitingForAction && (
            <TutorialButton variant="primary" onClick={handleNext}>
              {currentStep === tutorialSteps.length - 1 ? 'Finish' : 'Next'}
            </TutorialButton>
          )}
          
          {isWaitingForAction && (
            <div style={{ 
              color: '#FFE55C', 
              fontSize: '14px', 
              display: 'flex', 
              alignItems: 'center',
              gap: '8px'
            }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ 
                  width: '16px', 
                  height: '16px', 
                  border: '2px solid #FFE55C', 
                  borderTop: '2px solid transparent',
                  borderRadius: '50%'
                }}
              />
              Waiting for action...
            </div>
          )}
        </TutorialControls>
      </TutorialTooltip>
    </AnimatePresence>
  )
}
