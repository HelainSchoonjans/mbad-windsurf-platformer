---
stepsCompleted: [1, 2, 3, 4, 5, 6]
inputDocuments: ['prd.md']
workflowType: 'architecture'
project_name: 'bmad-windsurf'
user_name: 'heschoon'
date: '2026-01-28T13:54:00.000Z'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
The 20 FRs define a complete 2D platformer game with core gameplay mechanics (movement, jumping, collision detection), level interaction (spawn points, castle endpoint, fall detection), cross-platform input handling (keyboard + touch), game state management (phases, position tracking), and visual experience (polygon graphics, responsive design).

**Non-Functional Requirements:**
Performance requirements drive the architecture with 60fps rendering, 16ms input response, 3-second load time, and 30-minute reliability targets. Cross-platform consistency is critical for the demo's success.

**Scale & Complexity:**
- Primary domain: Game development (HTML5 Canvas, JavaScript)
- Complexity level: Medium
- Estimated architectural components: 6-8 core systems

### Technical Constraints & Dependencies

- Pure HTML/CSS/JavaScript stack with no external dependencies
- Canvas-based rendering for performance
- Cross-platform input abstraction layer
- Self-contained polygon graphics (no external assets)

### Cross-Cutting Concerns Identified

- Performance optimization across all systems
- Cross-platform input handling and responsiveness
- Game loop timing and physics consistency
- Memory management for extended play sessions

## Starter Template Evaluation

### Primary Technology Domain

Web Game Development with TypeScript + Vite + Phaser based on your technical preferences

### Starter Options Considered

**Official Phaser + Vite + TypeScript Template**: This is the official template from Phaser.js that combines exactly your preferred technologies - Phaser 3, Vite, and TypeScript. Updated to work with modern versions (Phaser 3.70+ and Vite 5.0+).

**Alternative Community Templates**: Several community forks exist but the official template provides the most reliable foundation with active maintenance.

### Selected Starter: Phaser + Vite + TypeScript Template

**Rationale for Selection:**
- Perfect match for your technology preferences (TypeScript + Vite + Phaser)
- Official template from Phaser.js team with active maintenance
- Built-in hot-reloading for rapid development workflow
- Production-ready build system that outputs to `dist/` folder (perfect for GitHub Pages)
- No physics libraries included (allows custom physics implementation as requested)
- Chrome-compatible with modern web standards

**Initialization Command:**

```bash
git clone https://github.com/phaserjs/template-vite-ts.git platformer-game
cd platformer-game
npm install
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
- TypeScript 5+ with strict type checking
- Modern ES6+ JavaScript features
- Node.js-based development environment

**Styling Solution:**
- Basic CSS structure in `public/style.css`
- Canvas-based rendering (Phaser handles visual output)

**Build Tooling:**
- Vite 5.0+ for fast development and optimized builds
- Hot-reloading development server on `localhost:8080`
- Production builds to `dist/` folder for GitHub Pages deployment

**Testing Framework:**
- No testing framework included (you can add Jest or Vitest later if needed)

**Code Organization:**
```
src/
├── main.ts           # Entry point
└── game/
    ├── main.ts       # Game configuration
    └── scenes/       # Game scenes (levels, menus, etc.)
public/
├── assets/          # Game assets (images, audio)
└── style.css        # Basic styling
```

**Development Experience:**
- Instant hot-reloading during development
- TypeScript compilation with error checking
- Asset management through Vite's import system
- Production optimization for web deployment

**Note:** Project initialization using this command should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Single Scene Approach - Simplifies development for timeline
- Entity-Component System - Scalable architecture foundation
- Phaser Input Plugins - Cross-platform input reliability

**Important Decisions (Shape Architecture):**
- State Machine Pattern - Professional game state management
- Simple Instantiation - Balanced performance and complexity
- Phaser Built-in Cleanup - Reliable memory management

**Deferred Decisions (Post-MVP):**
- Advanced performance profiling (if needed)
- Custom input mapping (if Phaser insufficient)

### Game Architecture

**Scene Organization:** Single Scene Approach
- Rationale: Simplifies development for 1-2 week timeline and single level requirement
- Implementation: All game states managed within one Phaser scene using state machine

**Object Pattern:** Entity-Component System (ECS)
- Rationale: Scalable architecture, good learning opportunity, professional standard
- Implementation: Separate data (components) from behavior (systems) for all game objects

**State Management:** State Machine Pattern
- Rationale: Professional standard, clear separation of concerns, demonstrates BMAD capabilities
- Implementation: Explicit states with transitions for menu, playing, completed, game over

### Performance & Optimization

**Rendering Strategy:** Simple Instantiation
- Rationale: Easier implementation, sufficient for simple game, meets timeline requirements
- Implementation: Create objects as needed, rely on Phaser's basic optimization

**Memory Management:** Phaser Built-in Cleanup
- Rationale: Leverages framework capabilities, less custom code, reliable for demo
- Implementation: Use Phaser's destroy() and shutdown() methods for object lifecycle

### Cross-Platform Input

**Input Architecture:** Phaser Input Plugins
- Rationale: Framework handles cross-platform differences, faster implementation, reliable
- Implementation: Use Phaser's keyboard and touch input systems with unified action mapping

### Decision Impact Analysis

**Implementation Sequence:**
1. Set up single scene with state machine
2. Implement ECS foundation with basic components
3. Configure Phaser input systems for cross-platform support
4. Add memory management patterns using Phaser cleanup
5. Optimize with simple instantiation patterns

**Cross-Component Dependencies:**
- ECS architecture affects physics, rendering, and input systems
- State machine integrates with all game systems
- Input abstraction feeds into ECS component updates

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
6 areas where AI agents could make different choices

### Naming Patterns

**ECS Naming Conventions:**
- Component Classes: PascalCase (PositionComponent, VelocityComponent)
- File Names: kebab-case (position-component.ts, velocity-component.ts)
- Instance Names: camelCase (positionComponent, velocityComponent)

**Code Naming Conventions:**
- Scenes: PascalCase (GameScene, MenuScene)
- Systems: PascalCase (MovementSystem, PhysicsSystem)
- Entities: camelCase (player, platform, castle)
- Methods: camelCase (update, create, destroy)

### Structure Patterns

**Project Organization:**
Feature-based organization with dedicated game directory:
```
src/
├── game/
│   ├── entities/
│   ├── components/
│   ├── systems/
│   └── scenes/
├── input/
├── physics/
└── utils/
```

**File Structure Patterns:**
- Components: src/game/components/[name]-component.ts
- Systems: src/game/systems/[name]-system.ts
- Entities: src/game/entities/[name].ts
- Scenes: src/game/scenes/[name]-scene.ts

### Format Patterns

**ECS Component Data Format:**
Flat properties for simplicity and performance:
```typescript
interface PositionComponent {
  x: number;
  y: number;
}
```

**System Update Signature:**
Simple update method with deltaTime:
```typescript
class MovementSystem {
  update(deltaTime: number): void
}
```

### Communication Patterns

**Event System Patterns:**
- Event Naming: camelCase with past tense (playerJumped, levelCompleted)
- Event Payloads: TypeScript interfaces with required fields
- Game State Updates: Through state machine, not direct mutation

**Input Action Patterns:**
- Action Names: camelCase (moveLeft, jump, restart)
- Input Mapping: Unified action names for keyboard and touch
- State Changes: Through state machine transitions

### Process Patterns

**Error Handling Patterns:**
- Use Phaser's built-in error handling where possible
- Custom errors logged with context information
- Graceful degradation for non-critical failures

**Loading State Patterns:**
- Loading managed through state machine
- Visual feedback during asset loading
- Progress indicators for long operations

### Enforcement Guidelines

**All AI Agents MUST:**

- Use PascalCase for all TypeScript classes and interfaces
- Use camelCase for variables, methods, and instances
- Use kebab-case for file names
- Follow the feature-based directory structure
- Implement ECS with flat component properties
- Use simple system.update(deltaTime) signature
- Handle errors through Phaser's error system
- Manage state through the state machine pattern

**Pattern Enforcement:**

- TypeScript strict mode will catch naming inconsistencies
- ESLint configuration enforces code patterns
- Code reviews verify architectural compliance
- Unit tests validate ECS component and system interfaces

### Pattern Examples

**Good Examples:**
```typescript
// Component: src/game/components/position-component.ts
export class PositionComponent {
  x: number = 0;
  y: number = 0;
}

// System: src/game/systems/movement-system.ts
export class MovementSystem {
  update(deltaTime: number): void {
    // Movement logic
  }
}

// Entity: src/game/entities/player.ts
export class Player {
  addComponent(component: any): void {
    // Component addition
  }
}
```

**Anti-Patterns:**
```typescript
// Avoid: Inconsistent naming
class position_component { } // Wrong case
class PositionComponent { } // Correct

// Avoid: Complex component structure
interface PositionComponent {
  position: { x: number; y: number }; // Unnecessary nesting
}

// Avoid: Inconsistent file names
PositionComponent.ts // Wrong case
position-component.ts // Correct
```

## Project Structure & Boundaries

### Complete Project Directory Structure

```
platformer-game/
├── README.md
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .gitignore
├── .env.example
├── index.html
├── public/
│   ├── assets/
│   │   └── (game assets - empty for polygon graphics)
│   └── style.css
├── src/
│   ├── main.ts
│   ├── game/
│   │   ├── main.ts
│   │   ├── ecs/
│   │   │   ├── components/
│   │   │   │   ├── position-component.ts
│   │   │   │   ├── velocity-component.ts
│   │   │   │   ├── render-component.ts
│   │   │   │   ├── player-component.ts
│   │   │   │   └── platform-component.ts
│   │   │   ├── systems/
│   │   │   │   ├── movement-system.ts
│   │   │   │   ├── physics-system.ts
│   │   │   │   ├── render-system.ts
│   │   │   │   ├── input-system.ts
│   │   │   │   └── level-system.ts
│   │   │   └── entities/
│   │   │       ├── entity.ts
│   │   │       ├── player.ts
│   │   │       ├── platform.ts
│   │   │       └── castle.ts
│   │   ├── scenes/
│   │   │   ├── game-scene.ts
│   │   │   └── scene-manager.ts
│   │   ├── physics/
│   │   │   ├── physics-engine.ts
│   │   │   └── collision-detection.ts
│   │   └── state/
│   │       ├── state-machine.ts
│   │       └── game-states.ts
│   ├── input/
│   │   ├── input-manager.ts
│   │   ├── keyboard-handler.ts
│   │   ├── touch-handler.ts
│   │   └── input-mapper.ts
│   └── utils/
│       ├── ecs-manager.ts
│       ├── game-constants.ts
│       └── helpers.ts
├── dist/
│   └── (build output)
└── docs/
    ├── architecture.md
    └── prd.md
```

### Architectural Boundaries

**ECS Boundaries:**
- Components: Pure data, no logic (position-component.ts, velocity-component.ts)
- Systems: Pure logic, no state (movement-system.ts, physics-system.ts)
- Entities: Component containers with factory methods (player.ts, platform.ts)
- ECS Manager: Coordinates component-system-entity interactions

**Scene Boundaries:**
- GameScene: Single scene managing all game states through state machine
- State Machine: Handles transitions between menu, playing, completed, game over
- Scene Manager: Coordinates scene lifecycle and state changes

**Input Boundaries:**
- Input Manager: Unified interface for all input types
- Platform Handlers: Keyboard vs touch specific implementations
- Input Mapper: Maps raw input to game actions (moveLeft, jump, restart)

### Requirements to Structure Mapping

**Feature Mapping:**
- **Gameplay Mechanics (FR1-FR5):** `src/game/systems/movement-system.ts`, `src/game/systems/physics-system.ts`
- **Level Interaction (FR6-FR10):** `src/game/systems/level-system.ts`, `src/game/entities/`
- **Input Handling (FR11-FR14):** `src/input/` directory with unified manager
- **Game State Management (FR15-FR17):** `src/game/state/` and `src/game/scenes/`
- **Visual Experience (FR18-FR20):** `src/game/systems/render-system.ts`

**Cross-Cutting Concerns:**
- **ECS Framework:** `src/utils/ecs-manager.ts` coordinates all ECS operations
- **Physics Engine:** `src/game/physics/` provides collision detection for all systems
- **State Management:** `src/game/state/state-machine.ts` used by all game systems

### Integration Points

**Internal Communication:**
- ECS Manager coordinates component-system-entity communication
- State Machine broadcasts state changes to all systems
- Input Manager publishes unified input events to systems

**External Integrations:**
- Phaser Framework: Core game engine providing rendering and input
- Vite Build System: Development server and production builds
- GitHub Pages: Static hosting for deployed game

**Data Flow:**
1. Input events → Input Manager → ECS Systems
2. ECS Systems update components each frame
3. Render System reads component data for visual output
4. State Machine manages game flow transitions

### File Organization Patterns

**Configuration Files:**
- Root level: package.json, vite.config.ts, tsconfig.json
- Environment: .env.example (no .env in repo for security)

**Source Organization:**
- Feature-based with game/ directory containing all game logic
- ECS separation: components/, systems/, entities/ subdirectories
- Cross-cutting: input/, physics/, state/, utils/ directories

**Asset Organization:**
- public/assets/ for game assets (empty for polygon graphics)
- public/style.css for basic styling
- No external image dependencies per requirements

### Development Workflow Integration

**Development Server Structure:**
- Vite serves from src/ with hot-reloading
- TypeScript compilation with strict mode
- Phaser development server integration

**Build Process Structure:**
- Vite builds to dist/ folder for GitHub Pages deployment
- TypeScript compilation and bundling
- Asset optimization and minification

**Deployment Structure:**
- Static files deployed to GitHub Pages
- No server-side requirements
- Browser-based deployment with CDN distribution
