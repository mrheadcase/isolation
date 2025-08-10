# Isolation Game

A modern, polished web implementation of the classic 1970s board game Isolation, featuring smooth animations, comprehensive tutorials, and an intuitive user interface. **Play now at: https://mrheadcase.github.io/isolation/**

## 🎮 Game Features

### **Enhanced Gameplay Experience**
- ✅ **Streamlined Controls**: Click directly on highlighted squares to move - no piece selection required
- ✅ **Smooth Animations**: Fluid piece movement with spring physics using Framer Motion
- ✅ **Smart Win Detection**: Automatic game-over detection when players have no valid moves
- ✅ **Visual Feedback**: Clear highlighting for valid moves and removable squares
- ✅ **Golden Starting Squares**: Permanent, unremovable starting positions

### **Game Modes & AI**
- ✅ **Player vs Player**: Local multiplayer on the same device
- ✅ **Player vs AI**: Multiple difficulty levels with strategic AI opponents
- ✅ **Undo System**: Take back moves with intelligent state management

### **Learning & Tutorial System**
- ✅ **Interactive Tutorial**: Step-by-step introduction for new players
- ✅ **Comprehensive Rules Guide**: Three-tab modal with complete game rules, strategy tips, and UI controls
- ✅ **Visual Examples**: Board diagrams showing game mechanics
- ✅ **Strategy Tips**: Advanced tactics and common mistake guidance

### **Customization & Themes**
- ✅ **Player Colors**: Choose from 6 vibrant colors (red, blue, green, yellow, purple, orange)
- ✅ **Dark/Light Themes**: Toggle between theme modes
- ✅ **Responsive Design**: Optimized for desktop and mobile devices
- ✅ **Organized Controls**: All game options centralized in an intuitive control panel

## 🛠 Technical Implementation

### **Modern React Architecture**
- **React 18** with TypeScript for type-safe development
- **Redux Toolkit** for predictable state management
- **Styled Components** with comprehensive theming system
- **Framer Motion** for smooth animations and transitions

### **Advanced Features**
- **State Persistence**: Game state maintained across browser sessions
- **Animation System**: Layout animations for piece movement with spring physics
- **Type Safety**: Comprehensive TypeScript definitions throughout
- **Component Architecture**: Modular, reusable React components

### **Deployment & Performance**
- **Vite Build System**: Fast development and optimized production builds
- **GitHub Actions CI/CD**: Automated testing and deployment pipeline
- **GitHub Pages Hosting**: Reliable, fast global content delivery
- **Cross-Browser Compatibility**: ES2015+ with legacy fallbacks

## 🚀 Quick Start

```bash
# Clone and setup
git clone https://github.com/mrheadcase/isolation.git
cd isolation
npm install

# Development server
npm run dev          # Starts at http://localhost:3000/isolation/

# Production build
npm run build        # Builds to dist/

# Preview production build
npm run preview      # Preview the built application
```

## 📁 Project Structure

```
src/
├── components/              # React Components
│   ├── GameBoard.tsx       # Main game interface with animations
│   ├── ControlPanel.tsx    # Game options and theme controls
│   ├── VictoryModal.tsx    # Win/lose celebration modal
│   ├── SimpleTutorial.tsx  # Welcome tutorial overlay
│   ├── RulesModal.tsx      # Comprehensive rules guide
│   └── Tutorial.tsx        # Legacy tutorial component
├── store/                  # Redux State Management
│   ├── gameSlice.ts       # Game state, moves, and logic
│   ├── themeSlice.ts      # Theme and UI preferences
│   └── index.ts           # Store configuration
├── ai/                    # AI Implementation
│   └── gameAI.ts         # Strategic AI with difficulty levels
├── types/                 # TypeScript Definitions
│   └── index.ts          # Game types and interfaces
├── styles/               # Global Styles
└── main.tsx             # Application entry point

.github/workflows/       # CI/CD Pipeline
└── deploy.yml          # Automated GitHub Pages deployment
```

## 🎯 How to Play

### **Basic Rules**
1. **Objective**: Be the last player who can make a move
2. **Movement**: Click any highlighted square adjacent to your piece to move there
3. **Removal**: After moving, click any square marked with × to remove it
4. **Restrictions**: Cannot move to or remove occupied squares, removed squares, or golden starting positions
5. **Victory**: Win when your opponent has no legal moves

### **Strategy Tips**
- **Control the Center**: Maintain mobility by staying near the board center
- **Create Barriers**: Use removed squares to channel your opponent toward edges
- **Preserve Options**: Always keep multiple escape routes open
- **Plan Ahead**: Think several moves ahead to set up winning positions

## 🎨 UI Components

### **Game Board**
- **Interactive Grid**: 7×7 responsive game board with visual feedback
- **Piece Animation**: Smooth movement with spring physics
- **Highlighting System**: Clear visual indicators for valid moves
- **Turn Indicators**: Active player highlighting and status display

### **Control Panel**
- **Game Modes**: Switch between PvP and AI modes
- **AI Difficulty**: Easy, Medium, and Hard AI opponents
- **Player Customization**: Choose colors for both players
- **Game Actions**: New game, undo moves, tutorial access
- **Theme Toggle**: Switch between dark and light modes

### **Tutorial System**
- **Welcome Modal**: Quick introduction for new players
- **Rules Guide**: Comprehensive three-tab reference
  - **Game Rules**: Complete rules with visual examples
  - **Strategy Guide**: Advanced tactics and tips
  - **Controls & UI**: Interface and control explanations

## 🔧 Development

### **Available Scripts**
```bash
npm run dev       # Development server with hot reload
npm run build     # Production build with optimization
npm run preview   # Preview production build locally
npm run typecheck # TypeScript type checking
```

### **Key Technologies**
- **React 19.1+**: Latest React with concurrent features
- **TypeScript 5.9+**: Strict type checking for reliability
- **Redux Toolkit 2.8+**: Modern Redux state management
- **Styled Components 6.1+**: CSS-in-JS with comprehensive theming
- **Framer Motion 12.23+**: Advanced animations and gestures
- **Vite 7.0+**: Next-generation frontend tooling

## 🚀 Deployment

The project automatically deploys to GitHub Pages via GitHub Actions:

1. **Automated Build**: Triggers on every push to main branch
2. **Type Checking**: Ensures TypeScript compilation passes
3. **Production Build**: Optimizes bundle size and performance
4. **GitHub Pages**: Deploys to `https://mrheadcase.github.io/isolation/`

### **Deployment Features**
- **Zero-Downtime Deployment**: Atomic deployments with rollback capability
- **Optimized Assets**: Minified and compressed for fast loading
- **Cache Management**: Proper cache headers for optimal performance
- **Error Handling**: Comprehensive build error reporting

## 📈 Recent Updates

### **v2.1 - Polish & UX Refinements (Latest)**
- ✅ **Victory Modal Bug Fix**: Fixed AI mode winner display flickering issue
- ✅ **ESC Key Support**: Added keyboard navigation to close modals (Rules & Tutorial)
- ✅ **Scroll-to-Top**: Rules modal tabs now automatically scroll to section top
- ✅ **Hidden Scrollbar**: Clean, minimal scrollbar styling in Rules modal
- ✅ **Enhanced State Management**: Added winner field to prevent modal display bugs

### **v2.0 - Enhanced Tutorial & UX**
- ✅ **Reorganized Controls**: Moved all game actions to organized control panel
- ✅ **Tutorial System**: Added comprehensive welcome tutorial and rules guide
- ✅ **Updated Documentation**: Accurate rules reflecting current gameplay
- ✅ **Visual Improvements**: Cleaner example boards and simplified UI
- ✅ **Better Navigation**: Integrated tutorial and rules access in game options

### **v1.5 - Animation & Polish**
- ✅ **Smooth Animations**: Added Framer Motion for piece movement
- ✅ **Enhanced Visuals**: Improved starting square styling and feedback
- ✅ **Win Detection**: Fixed comprehensive win condition checking
- ✅ **AI Improvements**: Better AI move calculation and timing

### **v1.0 - Core Implementation**
- ✅ **Complete Game Logic**: Full Isolation game implementation
- ✅ **Streamlined UX**: Direct move selection without piece clicking
- ✅ **State Management**: Redux Toolkit integration
- ✅ **Deployment**: Successful GitHub Pages deployment

## 🤝 Contributing

This project demonstrates modern React development practices and is open for contributions:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using React, TypeScript, and modern web technologies**

````
