# Isolation Game

A modern web implementation of the classic 1970s game Isolation, built with React, TypeScript, and Redux. **Now live at: https://mrheadcase.github.io/isolation/**

## Current Status ✅

This project is **fully functional** and successfully deployed to GitHub Pages. Key achievements:

- ✅ Complete game implementation with turn-based gameplay
- ✅ Enhanced UX: Direct move selection (no need to click piece first)
- ✅ TypeScript compilation with zero errors
- ✅ GitHub Pages deployment with MIME type compatibility fixes
- ✅ Cross-browser compatibility via Vite legacy plugin
- ✅ Responsive design with styled-components theming

## Features

- **Enhanced Gameplay**: Click directly on valid moves without selecting pieces first
- Player vs Player mode (AI features planned for future)
- Customizable piece colors with theme support
- Dark/Light theme toggle
- Smooth animations for piece movement and square removal
- Session-based game state management
- Built-in game rules and win/lose detection

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Styled Components with theme system
- **Animations**: Framer Motion
- **Build Tool**: Vite with legacy browser support
- **Deployment**: GitHub Actions → GitHub Pages

## Quick Start

```bash
# Clone and setup
git clone https://github.com/mrheadcase/isolation.git
cd isolation
npm install

# Development
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/          # React components
│   ├── GameBoard.tsx   # Main game interface
│   └── ControlPanel.tsx # Theme and game controls
├── store/              # Redux store and slices
│   ├── gameSlice.ts    # Game state management
│   └── themeSlice.ts   # Theme state management
├── types/              # TypeScript definitions
├── styles/             # Global styles and themes
└── main.tsx           # Application entry point

public/                 # Static assets and deployment configs
├── .htaccess          # Apache MIME type configuration
├── web.config         # IIS MIME type configuration
├── .nojekyll          # GitHub Pages Jekyll bypass
└── _headers           # Netlify-style headers

.github/workflows/      # GitHub Actions deployment
└── deploy.yml         # Automated build and deploy
```

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

## Setup Prompt for AI Assistant

If you need to recreate this project or continue development, use this comprehensive prompt:

```
Create a fully functional browser-based Isolation game with the following specifications:

CORE GAME IMPLEMENTATION:
- 7x7 grid board with turn-based gameplay between two players
- Players move one square in any direction (king-like movement)
- After moving, player must remove one square from the board
- Game ends when a player cannot make a valid move
- Enhanced UX: Allow players to click directly on valid moves without selecting their piece first
- Visual feedback for valid moves and game state

TECHNICAL STACK:
- React 18 with TypeScript (strict type checking)
- Redux Toolkit for state management (gameSlice, themeSlice)
- Styled Components with comprehensive theming system
- Framer Motion for smooth animations
- Vite build system with ES2015 target

DEPLOYMENT REQUIREMENTS:
- GitHub Actions workflow for automated deployment
- GitHub Pages compatibility with MIME type fixes
- Vite legacy plugin for cross-browser compatibility
- Multiple server configuration files (.htaccess, web.config, .nojekyll)

PROJECT STRUCTURE:
- Modular component architecture (GameBoard, ControlPanel)
- Centralized type definitions in types/index.ts
- Theme system with dark/light modes
- Redux store with proper TypeScript integration

CRITICAL DEPLOYMENT FIXES:
- Use @vitejs/plugin-legacy for ES module fallbacks
- Include comprehensive MIME type configurations
- GitHub Actions with official pages deployment action
- Proper base path configuration for GitHub Pages subdirectory

The result should be a fully playable game deployed to GitHub Pages with zero TypeScript errors and cross-browser compatibility.
```

## Development History

### Key Milestones
1. **Initial Setup**: React + TypeScript + Redux Toolkit foundation
2. **Game Logic**: Core Isolation game mechanics implementation  
3. **UX Enhancement**: Direct move selection gameplay improvement
4. **TypeScript Fixes**: Resolved all compilation errors and type issues
5. **Deployment Challenges**: Overcame GitHub Pages MIME type issues
6. **Cross-Browser Support**: Added legacy plugin for broad compatibility

### Technical Challenges Solved
- **MIME Type Issues**: GitHub Pages serving JS files as `application/octet-stream`
- **ES Module Compatibility**: Legacy fallbacks for older browsers/servers
- **TypeScript Strictness**: Proper type definitions and Redux integration
- **GitHub Actions**: Automated build and deployment pipeline

## Deployment Architecture

The project uses a robust deployment strategy:

1. **GitHub Actions**: Automated build on every push to main
2. **Vite Legacy Plugin**: Generates both modern and legacy bundles
3. **MIME Type Fixes**: Multiple configuration files for different servers
4. **Official GitHub Pages Action**: Uses `actions/deploy-pages@v4` for reliability

````
