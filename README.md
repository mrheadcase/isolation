# Isolation Game

A modern, polished web implementation of the classic 1970s board game Isolation, featuring smooth animations, comprehensive tutorials, multiple board sizes, and an intuitive user interface. **Play now at: https://mrheadcase.github.io/isolation/**

## 🎮 Game Features

### **Enhanced Gameplay Experience**
- ✅ **Multiple Board Sizes**: 5×5 Quick, 7×7 Classic, 9×9 Strategic, and 11×11 Epic modes
- ✅ **Streamlined Controls**: Click directly on highlighted squares to move - no piece selection required
- ✅ **Smooth Animations**: Fluid piece movement with spring physics using Framer Motion
- ✅ **Smart Win Detection**: Automatic game-over detection when players have no valid moves
- ✅ **Visual Feedback**: Clear highlighting for valid moves and removable squares
- ✅ **Golden Starting Squares**: Permanent, unremovable starting positions
- ✅ **Responsive Layout**: Control panel appears beside smaller boards when screen space allows

### **Game Modes & AI**
- ✅ **Player vs Player**: Local multiplayer on the same device
- ✅ **Player vs AI**: Three distinct difficulty levels with genuinely different strategies
  - **Easy AI**: Makes suboptimal moves and random decisions for beginners
  - **Medium AI**: Balanced strategic play with moderate challenge
  - **Hard AI**: Advanced mobility analysis and strategic square removal
- ✅ **Undo System**: Take back moves with intelligent state management
- ✅ **Dynamic Board Creation**: Automatic game restart when changing board sizes
- ✅ **Adaptive AI Strategy**: AI difficulty scales with board size complexity

### **Learning & Tutorial System**
- ✅ **Interactive Tutorial**: Step-by-step introduction for new players
- ✅ **Comprehensive Rules Guide**: Three-tab modal with complete game rules, strategy tips, and UI controls
- ✅ **Visual Examples**: Board diagrams showing game mechanics
- ✅ **ESC Key Support**: Close modals with keyboard navigation
- ✅ **Scroll-to-Top**: Automatic section navigation in rules modal

### **Visual & UX Enhancements**
- ✅ **Hidden Scrollbars**: Clean, minimal modal styling without visual clutter
- ✅ **Theme Support**: Dark/light theme compatibility
- ✅ **Victory Celebrations**: Polished win/loss announcements with proper state management
- ✅ **Size-Responsive Design**: Board and UI scale appropriately for different game sizes

## 🛠 Technical Stack

### **Frontend Framework**
- **React 19.1+**: Latest React with concurrent features and improved performance
- **TypeScript 5.9+**: Full type safety and enhanced developer experience
- **Vite 7.0+**: Lightning-fast build tool with HMR and optimized bundling

### **State Management & Logic**
- **Redux Toolkit**: Centralized state management with RTK Query integration
- **Immutable Updates**: Reliable state mutations with built-in debugging
- **AI System**: Strategic game AI with dynamic board size adaptation

### **Styling & Animation**
- **Styled Components 6.1+**: CSS-in-JS with full TypeScript support and theming
- **Framer Motion 12.23+**: Smooth animations and layout transitions
- **Responsive Design**: Flexible layouts that adapt to content and screen size

### **Development & Build**
- **ESLint & Prettier**: Code quality and formatting automation
- **GitHub Actions**: Automated CI/CD pipeline with comprehensive testing
- **Vite Build Optimization**: Tree shaking, code splitting, and asset optimization

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

## � Live Demo & Deployment

### **GitHub Pages Deployment**
- **Live URL**: https://mrheadcase.github.io/isolation/
- **Automatic Updates**: Deploys on every push to main branch
- **Zero-Downtime Deployment**: Atomic deployments with rollback capability
- **Optimized Assets**: Minified and compressed for fast loading
- **Cache Management**: Proper cache headers for optimal performance
- **Error Handling**: Comprehensive build error reporting

## 📈 Recent Updates

### **v2.3 - AI Difficulty Implementation (Latest)**
- ✅ **Genuine AI Difficulty Levels**: Easy, Medium, and Hard now play with distinct strategies
- ✅ **Easy AI**: Makes suboptimal moves (30% random decisions) and reduces mobility focus
- ✅ **Medium AI**: Balanced strategic play with slight randomness for variety
- ✅ **Hard AI**: Advanced mobility analysis and strategic square removal to limit player options
- ✅ **Adaptive Strategies**: AI behavior scales appropriately with board size complexity

### **v2.2 - Multiple Board Sizes**
- ✅ **Board Size Options**: Added 5×5, 7×7, 9×9, and 11×11 game modes
- ✅ **Responsive Sizing**: Smaller boards use less screen space for better layout
- ✅ **Dynamic AI**: AI strategy adapts to different board sizes and positioning
- ✅ **Auto-Restart**: Games automatically reset when changing board sizes
- ✅ **Layout Optimization**: Control panel displays beside smaller boards when space allows

### **v2.1 - Polish & UX Refinements**
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

## 🎯 Game Variants & Strategy

### **AI Difficulty Strategies**
- **Easy AI**: Perfect for beginners learning the game
  - Makes intentionally suboptimal moves (30% random decisions)
  - Reduced focus on mobility and strategic positioning
  - Allows players to learn tactics without overwhelming opposition
- **Medium AI**: Balanced challenge for casual players
  - Uses standard strategic scoring with slight randomness
  - Focuses on mobility, center control, and distance management
  - Provides engaging gameplay without being frustrating
- **Hard AI**: Advanced strategic opponent for experienced players
  - Analyzes all possible square removals to minimize player mobility
  - Enhanced mobility weighting and board size adaptation
  - Provides genuine strategic challenge requiring careful planning

### **Board Size Strategies**
- **5×5 Quick**: Fast-paced games emphasizing early positioning and quick tactical decisions
- **7×7 Classic**: Traditional balanced gameplay with moderate strategic depth
- **9×9 Strategic**: Extended gameplay allowing for complex tactical planning and positioning
- **11×11 Epic**: Maximum strategic complexity with long-term planning and advanced tactics

### **Universal Game Rules**
1. **Movement**: Players alternate moving one square in any direction (including diagonally)
2. **Square Removal**: After each move, the current player removes one available square from the board
3. **Winning**: The first player unable to move loses the game
4. **Starting Squares**: Golden center squares cannot be removed and provide strategic anchors

## 🎨 Project Structure

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

## 💻 Development Setup

### **Prerequisites**
- Node.js 18+ (recommended: 20+)
- npm or yarn package manager
- Modern web browser with ES2020+ support

### **Installation & Running**
```bash
# Clone the repository
git clone https://github.com/mrheadcase/isolation.git
cd isolation

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### **Development Features**
- **Hot Module Replacement**: Instant updates during development
- **TypeScript Checking**: Real-time type error detection
- **ESLint Integration**: Code quality enforcement
- **Source Maps**: Full debugging support in development

## 🤖 AI Assistant Setup Prompt

To recreate this exact project with all current features, use this comprehensive prompt with any AI assistant:

```
Create a fully functional browser-based Isolation game with the following specifications:

CORE GAME IMPLEMENTATION:
- Classic Isolation board game rules with piece movement and square removal
- Multiple board sizes: 5×5, 7×7, 9×9, and 11×11 with dynamic layouts
- Player vs Player and Player vs AI game modes
- Three distinct AI difficulty levels with genuinely different strategies:
  * Easy AI: 30% random decisions, reduced mobility focus for beginners
  * Medium AI: Balanced strategic play with slight randomness for variety
  * Hard AI: Advanced mobility analysis and strategic square removal
- Strategic AI opponents that adapt to different board sizes
- Comprehensive win condition detection for all scenarios
- Undo/redo functionality with full state management

TECHNOLOGY STACK:
- React 19+ with TypeScript for type-safe component development
- Redux Toolkit for centralized state management
- Styled Components for CSS-in-JS theming and responsive design
- Framer Motion for smooth piece animations and layout transitions
- Vite for fast development and optimized production builds

USER EXPERIENCE FEATURES:
- Streamlined controls: direct move selection without piece clicking
- Smooth piece movement animations with spring physics
- Interactive tutorial system with step-by-step guidance
- Comprehensive rules modal with strategy guide and controls reference
- Responsive layout that adapts to board size and screen dimensions
- ESC key support for modal navigation and accessibility

VISUAL DESIGN:
- Dark theme with professional game board styling
- Golden starting squares that cannot be removed
- Clear visual feedback for valid moves and removable squares
- Hidden scrollbars and clean modal interfaces
- Size-responsive board scaling for optimal screen utilization

DEPLOYMENT REQUIREMENTS:
- GitHub Pages compatible build configuration
- Vite configuration with proper base path for subdirectory deployment
- GitHub Actions workflow for automated CI/CD pipeline
- Comprehensive error handling and build optimization
- Cross-browser compatibility with modern web standards

CRITICAL DEPLOYMENT FIXES:
- Use Vite 7+ without legacy plugin to avoid crypto.hash compatibility issues
- Include proper Node.js version (20+) in GitHub Actions workflow
- Configure GitHub Pages source to "GitHub Actions" not branch deployment
- Implement proper asset optimization and cache management

GAME STATE MANAGEMENT:
- Comprehensive game state with board size, winner tracking, and move history
- AI thinking indicators and tutorial mode state
- Three-tier AI difficulty system with distinct behavioral patterns
- Proper state resets when changing board sizes
- Victory modal with accurate winner display and state management
- AI difficulty persistence across game sessions
```

This prompt captures all implemented features, technical architecture, deployment fixes, and UX enhancements needed to recreate the complete project.

## � License

MIT License - feel free to use this code for your own projects!

## 🙏 Acknowledgments

- Inspired by the classic 1970s Isolation board game
- Built with modern web technologies for optimal performance and user experience
- Designed for both casual players and strategic game enthusiasts
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
