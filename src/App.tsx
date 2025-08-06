import { useSelector } from 'react-redux'
import styled, { ThemeProvider } from 'styled-components'
import type { RootState } from './types'
import { darkTheme, lightTheme } from './styles/theme'
import { GlobalStyle } from './styles/GlobalStyle'
import { GameBoard } from './components/GameBoard'
import { ControlPanel } from './components/ControlPanel'

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.textColor};
`

const GameContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
`

function App() {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode)
  const theme = isDarkMode ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle theme={theme} />
      <AppContainer>
        <GameContainer>
          <GameBoard />
          <ControlPanel />
        </GameContainer>
      </AppContainer>
    </ThemeProvider>
  )
}

export default App
