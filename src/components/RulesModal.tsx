import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

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
  padding: 20px;
`

const Content = styled(motion.div)`
  background-color: ${props => props.theme.backgroundColor};
  border-radius: 12px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  color: ${props => props.theme.textColor};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);

  /* Hide scrollbar but maintain scroll functionality */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */

  /* Webkit scrollbar hiding */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`

const Header = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.primaryColor}, ${props => props.theme.secondaryColor});
  padding: 24px;
  border-radius: 12px 12px 0 0;
  position: sticky;
  top: 0;
  z-index: 10;
`

const Title = styled.h1`
  margin: 0;
  color: white;
  font-size: 28px;
  text-align: center;
`

const TabContainer = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0 0 8px 8px;
  margin-top: 16px;
`

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 12px 16px;
  border: none;
  background-color: ${props => props.active ? props.theme.primaryColor : 'transparent'};
  color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.8)'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: ${props => props.active ? 'bold' : 'normal'};

  &:first-child {
    border-radius: 0 0 0 8px;
  }

  &:last-child {
    border-radius: 0 0 8px 0;
  }

  &:hover {
    background-color: ${props => props.active ? props.theme.primaryColor : 'rgba(255, 255, 255, 0.1)'};
  }
`

const Body = styled.div`
  padding: 24px;
`

const Section = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`

const SectionTitle = styled.h2`
  color: ${props => props.theme.primaryColor};
  margin-bottom: 16px;
  font-size: 22px;
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: '';
    width: 4px;
    height: 24px;
    background-color: ${props => props.theme.primaryColor};
    border-radius: 2px;
  }
`

const SubTitle = styled.h3`
  color: ${props => props.theme.textColor};
  margin: 20px 0 12px 0;
  font-size: 18px;
`

const List = styled.ul`
  margin: 16px 0;
  padding-left: 24px;
  line-height: 1.6;

  li {
    margin-bottom: 8px;
  }

  ul {
    margin: 8px 0;
    padding-left: 20px;
  }
`

const HighlightBox = styled.div<{ variant?: 'tip' | 'warning' | 'info' }>`
  background-color: ${props => {
    switch (props.variant) {
      case 'tip': return 'rgba(76, 175, 80, 0.1)'
      case 'warning': return 'rgba(255, 193, 7, 0.1)'
      case 'info': return 'rgba(33, 150, 243, 0.1)'
      default: return 'rgba(255, 255, 255, 0.05)'
    }
  }};
  border-left: 4px solid ${props => {
    switch (props.variant) {
      case 'tip': return '#4CAF50'
      case 'warning': return '#FFC107'
      case 'info': return '#2196F3'
      default: return props.theme.primaryColor
    }
  }};
  padding: 16px;
  margin: 16px 0;
  border-radius: 0 8px 8px 0;
`

const GameExample = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 20px;
  margin: 16px 0;
  text-align: center;
`

const BoardExample = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(7, 30px);
  gap: 2px;
  background-color: ${props => props.theme.secondaryColor};
  padding: 8px;
  border-radius: 6px;
  margin: 12px 0;
`

const CellExample = styled.div<{ type: 'empty' | 'removed' | 'player1' | 'player2' | 'start' }>`
  width: 30px;
  height: 30px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  background-color: ${props => {
    switch (props.type) {
      case 'empty': return 'rgba(255, 255, 255, 0.1)'
      case 'removed': return 'rgba(0, 0, 0, 0.5)'
      case 'player1': return '#FF4444'
      case 'player2': return '#4444FF'
      case 'start': return '#FFD700'
      default: return 'rgba(255, 255, 255, 0.1)'
    }
  }};
  color: ${props => props.type === 'start' ? '#000' : '#fff'};
`

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.02);
  border-radius: 0 0 12px 12px;
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

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTutorial: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose, onStartTutorial }) => {
  const [activeTab, setActiveTab] = useState<'rules' | 'strategy' | 'controls'>('rules')
  const contentRef = useRef<HTMLDivElement>(null)

  // Function to handle tab changes with scroll reset
  const handleTabChange = (tab: 'rules' | 'strategy' | 'controls') => {
    setActiveTab(tab)
    // Scroll to top of the content when tab changes
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }

  // Add ESC key support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const renderBoard = () => {
    const board = [
      ['empty', 'empty', 'empty', 'start', 'empty', 'empty', 'empty'],
      ['empty', 'player1', 'removed', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'removed', 'empty', 'empty', 'empty', 'removed', 'empty'],
      ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'removed', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'empty', 'removed', 'player2', 'empty'],
      ['empty', 'empty', 'empty', 'start', 'empty', 'empty', 'empty']
    ]

    return (
      <BoardExample>
        {board.flat().map((cell, index) => (
          <CellExample key={index} type={cell as any}>
            {cell === 'player1' ? '1' : cell === 'player2' ? '2' : ''}
          </CellExample>
        ))}
      </BoardExample>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'rules':
        return (
          <>
            <Section>
              <SectionTitle>Game Setup</SectionTitle>
              <List>
                <li>Isolation is played on a square grid (board sizes: 5×5, 7×7, 9×9, or 11×11)</li>
                <li>Two players start at opposite ends of the center column</li>
                <li>Player 1 (red) starts at the top, Player 2 (blue) at the bottom</li>
                <li>The golden starting squares are permanent and cannot be removed</li>
              </List>
              
              <GameExample>
                <SubTitle>Example Game State</SubTitle>
                {renderBoard()}
                <div style={{ fontSize: '14px', marginTop: '12px', opacity: 0.8 }}>
                  Gold squares = Starting positions (permanent) | Dark squares = Removed | 1,2 = Players
                </div>
              </GameExample>
            </Section>

            <Section>
              <SectionTitle>Turn Structure</SectionTitle>
              <SubTitle>Each turn consists of two phases:</SubTitle>
              <List>
                <li><strong>Movement Phase:</strong> Move your piece to an adjacent square
                  <ul>
                    <li>You can move one space in any of the 8 directions (like a king in chess)</li>
                    <li>You cannot move to a removed square (shown in dark)</li>
                    <li>You cannot move to a square occupied by your opponent</li>
                  </ul>
                </li>
                <li><strong>Removal Phase:</strong> Remove one square from the board
                  <ul>
                    <li>You can remove any square except:</li>
                    <li>The square you just moved to</li>
                    <li>The square your opponent occupies</li>
                    <li>Already removed squares</li>
                    <li>The permanent starting squares (golden)</li>
                  </ul>
                </li>
              </List>
            </Section>

            <Section>
              <SectionTitle>Winning the Game</SectionTitle>
              <List>
                <li>The game ends when a player cannot make a legal move</li>
                <li>The player who made the last legal move wins</li>
                <li>This happens when a player is "isolated" with no adjacent squares to move to</li>
              </List>
              
              <HighlightBox variant="tip">
                <strong>Victory Tip:</strong> The key is to limit your opponent's options while preserving your own mobility!
              </HighlightBox>
            </Section>
          </>
        )

      case 'strategy':
        return (
          <>
            <Section>
              <SectionTitle>Basic Strategy</SectionTitle>
              
              <SubTitle>Early Game</SubTitle>
              <List>
                <li>Control the center of the board for maximum mobility</li>
                <li>Don't rush toward your opponent immediately</li>
                <li>Remove squares that limit your opponent's long-term options</li>
                <li>Keep multiple escape routes open</li>
              </List>

              <SubTitle>Mid Game</SubTitle>
              <List>
                <li>Start creating "walls" of removed squares to channel your opponent</li>
                <li>Force your opponent toward the edges of the board</li>
                <li>Maintain connectivity between areas of the board</li>
                <li>Look for opportunities to create forks (multiple threats)</li>
              </List>

              <SubTitle>End Game</SubTitle>
              <List>
                <li>Count moves carefully - sometimes it's a race</li>
                <li>Force your opponent into smaller and smaller areas</li>
                <li>Use tempo moves to put pressure on your opponent</li>
                <li>Remember: the last player to move wins!</li>
              </List>
            </Section>

            <Section>
              <SectionTitle>Advanced Tactics</SectionTitle>
              
              <HighlightBox variant="info">
                <strong>Zugzwang:</strong> Put your opponent in a position where any move they make worsens their situation.
              </HighlightBox>

              <HighlightBox variant="tip">
                <strong>Territory Control:</strong> Divide the board into regions and try to control the largest connected area.
              </HighlightBox>

              <HighlightBox variant="warning">
                <strong>Bridge Building:</strong> Create paths between distant areas before your opponent can cut them off.
              </HighlightBox>
            </Section>

            <Section>
              <SectionTitle>Common Mistakes</SectionTitle>
              <List>
                <li>Moving too aggressively early in the game</li>
                <li>Removing squares randomly without considering long-term implications</li>
                <li>Focusing only on attacking without defending your own mobility</li>
                <li>Not counting moves in endgame situations</li>
                <li>Forgetting that starting squares cannot be removed</li>
              </List>
            </Section>
          </>
        )

      case 'controls':
        return (
          <>
            <Section>
              <SectionTitle>Basic Controls</SectionTitle>
              
              <SubTitle>Making Moves</SubTitle>
              <List>
                <li>On your turn, click on any highlighted square around your piece to move there instantly</li>
              </List>

              <SubTitle>Removing Squares</SubTitle>
              <List>
                <li>After moving, squares available for removal are marked with a red ×</li>
                <li>Click on any marked square to remove it</li>
                <li>Removed squares turn dark and become impassable</li>
              </List>
            </Section>

            <Section>
              <SectionTitle>Visual Indicators</SectionTitle>
              <List>
                <li><strong>Gold squares:</strong> Starting positions (permanent and cannot be removed)</li>
                <li><strong>Highlighted squares:</strong> Valid moves around your piece</li>
                <li><strong>Red × marks:</strong> Squares that can be removed after moving</li>
                <li><strong>Dark squares:</strong> Already removed (impassable)</li>
                <li><strong>Colored circles:</strong> Player pieces</li>
              </List>
            </Section>

            <Section>
              <SectionTitle>Game Features</SectionTitle>
              
              <SubTitle>Undo System</SubTitle>
              <List>
                <li>Use the "Undo Move" button to take back your last action</li>
                <li>Undo is available during your turn before finalizing moves</li>
                <li>Multiple undos may be available depending on game settings</li>
              </List>

              <SubTitle>Game Modes</SubTitle>
              <List>
                <li><strong>Player vs Player:</strong> Take turns on the same device</li>
                <li><strong>Player vs AI:</strong> Play against computer opponents</li>
                <li><strong>Tutorial Mode:</strong> Learn with guided instruction</li>
              </List>
            </Section>
          </>
        )

      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <Content
            ref={contentRef}
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            onClick={e => e.stopPropagation()}
          >
            <Header>
              <Title>Isolation - Complete Guide</Title>
              <TabContainer>
                <Tab 
                  active={activeTab === 'rules'} 
                  onClick={() => handleTabChange('rules')}
                >
                  Game Rules
                </Tab>
                <Tab 
                  active={activeTab === 'strategy'} 
                  onClick={() => handleTabChange('strategy')}
                >
                  Strategy Guide
                </Tab>
                <Tab 
                  active={activeTab === 'controls'} 
                  onClick={() => handleTabChange('controls')}
                >
                  Controls & UI
                </Tab>
              </TabContainer>
            </Header>

            <Body>
              {renderTabContent()}
            </Body>

            <Controls>
              <Button onClick={onStartTutorial} variant="primary">
                Start Interactive Tutorial
              </Button>
              <Button onClick={onClose}>
                Close
              </Button>
            </Controls>
          </Content>
        </Overlay>
      )}
    </AnimatePresence>
  )
}
