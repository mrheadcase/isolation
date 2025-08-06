# Isolation Game

A modern web implementation of the classic 1970s game Isolation, built with React, TypeScript, and Redux.

## Features

- Player vs Player and Player vs AI modes
- Three AI difficulty levels with different play styles
- Customizable piece colors
- Dark/Light theme support
- Move undo feature (up to 10 moves)
- Session-based score tracking
- Built-in tutorial for new players
- Smooth animations for piece movement and square removal

## Tech Stack

- React 18 with TypeScript
- Redux Toolkit for state management
- Styled Components for styling
- Framer Motion for animations
- Vite for development and building

## Development

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

## Project Structure

- `/src`
  - `/components` - React components
  - `/store` - Redux store configuration and slices
  - `/styles` - Global styles and theme configuration
  - `/types` - TypeScript type definitions
  - `/utils` - Helper functions and game logic

## Game Rules

1. The game is played on a 7x7 grid
2. Two players take turns moving their pieces
3. Players can move one square in any direction (like a king in chess)
4. After moving, the player must remove one square from the board
5. Players cannot move to or remove:
   - A square that's already removed
   - A square occupied by either player
   - The starting positions
6. The game ends when a player cannot make a valid move
7. The player who cannot move loses

## Prompt History

### Initial Project Setup Prompt

```
Create a browser-based implementation of the 1970s game Isolation with the following features:

Core Game Features:
- Player vs Player (default mode) and Player vs AI
- AI with 3 difficulty levels and different play styles (aggressive, defensive, balanced)
- Move undo feature limited to 10 moves
- Session-based score tracking
- Built-in tutorial for new players

Visual and UI Features:
- Customizable piece colors (with conflict prevention)
- Animations for moves and square removal
- Dark/Light theme with green as default theme color
- 7x7 game board with clear visual feedback

Technical Requirements:
- React with TypeScript for type safety
- Redux Toolkit for state management
- Styled Components for styling
- Framer Motion for animations

Do not include:
- Move timer
- Sound effects
- Save/load functionality
- Online multiplayer
- Game replay feature
```

This single prompt would create the foundation of our current implementation, focusing on the core game mechanics and essential features while explicitly excluding unnecessary complications.

### Project Progress - [August 5, 2025 01:24 AM]

The project currently includes:
1. Base project structure with Vite/React/TypeScript setup
2. Redux store configuration with theme and game slices
3. Styled components with dark/light theme support
4. Basic game board implementation with 7x7 grid
5. Control panel with game mode and theme options
6. Core game components (GameBoard, ControlPanel)

Next steps:
1. Implement game move logic
2. Add AI opponent functionality
3. Create tutorial component
4. Add move undo feature
5. Implement score tracking
6. Add piece color customization

````
