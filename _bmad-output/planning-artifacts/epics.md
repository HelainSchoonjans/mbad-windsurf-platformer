---
stepsCompleted: [1, 2]
inputDocuments: ['prd.md', 'architecture.md']
---

# bmad-windsurf - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for bmad-windsurf, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Player can move character left and right across the game world
FR2: Player can make character jump with gravity-based physics
FR3: Player can control character movement with responsive acceleration/deceleration
FR4: System can detect when character collides with level geometry
FR5: System can apply gravity physics to character movement
FR6: Player can start level from designated spawn point
FR7: Player can reach castle endpoint to complete level
FR8: System can detect when player falls off screen boundaries
FR9: Player can respawn at start point after falling off screen
FR10: System can provide visual feedback when level is completed
FR11: Player can control character using keyboard arrow keys and spacebar
FR12: Player can control character using touch-based virtual controls
FR13: System can detect input device type and provide appropriate controls
FR14: System can provide immediate visual feedback for player inputs
FR15: System can manage game phases (menu, playing, completed)
FR16: System can track player position within game world
FR17: System can handle instant game restart functionality
FR18: System can render game using simple polygon graphics
FR19: System can adapt display to different screen sizes
FR20: System can maintain consistent gameplay experience across platforms

### Non-Functional Requirements

NFR1: Game maintains consistent 60fps rendering during gameplay
NFR2: Player input responds within 16ms for immediate feedback
NFR3: Game loads and becomes playable within 3 seconds on typical mobile connection
NFR4: Physics calculations update at fixed timestep for consistent behavior
NFR5: Game operates without crashes during continuous 30-minute play sessions
NFR6: Game behavior remains consistent across desktop and mobile platforms
NFR7: System can recover gracefully from unexpected errors without losing game state

### Additional Requirements

- Initialize project using Phaser + Vite + TypeScript template: `git clone https://github.com/phaserjs/template-vite-ts.git platformer-game`
- Follow feature-based project organization with ECS separation
- Use single scene approach with state machine pattern
- Implement ECS architecture with PositionComponent, VelocityComponent, MovementSystem, PhysicsSystem
- Use Phaser input plugins for cross-platform compatibility
- Apply simple instantiation pattern for object lifecycle management
- Follow naming conventions: PascalCase (classes), camelCase (instances), kebab-case (files)

### FR Coverage Map

- **Gameplay Mechanics (FR1-FR5):** Covered by Core Gameplay Epic
- **Level Interaction (FR6-FR10):** Covered by Level Management Epic  
- **Input Handling (FR11-FR14):** Covered by Input System Epic
- **Game State Management (FR15-FR17):** Covered by Game State Management Epic
- **Visual Experience (FR18-FR20):** Covered by Rendering System Epic

## Epic List

**Epic 1: Project Setup and Core Infrastructure**
- Goal: Establish the development environment and core game engine foundation
- Stories: Project initialization, ECS framework, basic game loop

**Epic 2: Core Gameplay Mechanics**
- Goal: Implement fundamental player movement and physics systems
- Stories: Character movement, jumping mechanics, collision detection, gravity simulation

**Epic 3: Level Management**
- Goal: Create the playable level with start point, obstacles, and completion conditions
- Stories: Level initialization, platform creation, castle endpoint, fall detection, respawn system

**Epic 4: Input System**
- Goal: Implement cross-platform input handling for desktop and mobile
- Stories: Keyboard controls, touch controls, input device detection, visual feedback

**Epic 5: Game State Management**
- Goal: Manage game phases and overall game flow
- Stories: State machine implementation, game phases, position tracking, restart functionality

**Epic 6: Rendering System**
- Goal: Create visual output using polygon graphics with responsive design
- Stories: Polygon rendering, responsive design, cross-platform consistency

## Epic 1: Project Setup and Core Infrastructure

**Goal:** Establish the development environment and core game engine foundation

### Story 1.1: Initialize Project with Starter Template

**As a** developer,
**I want to** set up the project using the Phaser + Vite + TypeScript template,
**So that** I have a working development environment with all necessary dependencies installed.

**Acceptance Criteria:**

**Given** I have the starter template URL
**When** I execute the clone command and install dependencies
**Then** the project structure is created with all necessary files
**And** the development server starts successfully on localhost:8080

### Story 1.2: Implement ECS Framework Foundation

**As a** developer,
**I want to** create the core Entity-Component-System framework,
**So that** I have a scalable architecture for game objects.

**Acceptance Criteria:**

**Given** the ECS architecture requirements
**When** I implement the base Entity class and ECS manager
**Then** I can create entities, add components, and register systems
**And** the ECS manager coordinates component-system interactions each frame

### Story 1.3: Establish Game Loop and Scene Management

**As a** developer,
**I want to** set up the core game loop with single scene management,
**So that** I have the foundation for game execution.

**Acceptance Criteria:**

**Given** the single scene architecture decision
**When** I implement the GameScene class and main game loop
**Then** the game runs at 60fps with proper frame timing
**And** the scene can transition between game states through the state machine

## Epic 2: Core Gameplay Mechanics

**Goal:** Implement fundamental player movement and physics systems

### Story 2.1: Implement Character Movement System

**As a** player,
**I want to** control character movement left and right with responsive controls,
**So that** I can navigate the game world effectively.

**Acceptance Criteria:**

**Given** keyboard or touch input is detected
**When** I press left/right movement keys or touch controls
**Then** the character moves smoothly with acceleration/deceleration
**And** movement feels responsive and immediate

### Story 2.2: Implement Jump Mechanics

**As a** player,
**I want to** make the character jump with gravity-based physics,
**So that** I can overcome obstacles and reach higher platforms.

**Acceptance Criteria:**

**Given** the jump input is detected
**When** I press the jump button or key
**Then** the character jumps with realistic gravity physics
**And** the jump height and duration feel natural

### Story 2.3: Implement Physics Engine

**As a** developer,
**I want to** create a physics engine with collision detection,
**So that** game objects interact realistically with the environment.

**Acceptance Criteria:**

**Given** the physics engine is implemented
**When** the character moves or jumps
**Then** collisions with platforms are detected accurately
**And** physics calculations update at fixed timestep for consistency

### Story 2.4: Implement Velocity and Position Components

**As a** developer,
**I want to** create PositionComponent and VelocityComponent for ECS,
**So that** character movement data is properly structured and managed.

**Acceptance Criteria:**

**Given** the ECS framework is established
**When** I add PositionComponent and VelocityComponent to entities
**Then** position and velocity data is stored separately from logic
**And** components can be queried by systems for game logic

## Epic 3: Level Management

**Goal:** Create the playable level with start point, obstacles, and completion conditions

### Story 3.1: Create Level Initialization System

**As a** developer,
**I want** to initialize the game level with spawn point and castle endpoint,
**So that** players have a clear starting position and goal.

**Acceptance Criteria:**

**Given** the level design requirements
**When** the game starts or restarts
**Then** the player spawns at the designated start point
**And** the castle endpoint is clearly visible and reachable

### Story 3.2: Implement Platform Creation System

**As a** developer,
**I want** to create platforms that form the level layout,
**So that** players have surfaces to jump on and navigate.

**Acceptance Criteria:**

**Given** the level design specifications
**When** platforms are created in the game world
**Then** they have proper collision detection
**And** they support the character's movement and jumping mechanics

### Story 3.3: Implement Castle Endpoint System

**As a** player,
**I want** to reach the castle endpoint to complete the level,
**So that** I have a clear victory condition and sense of accomplishment.

**Acceptance Criteria:**

**Given** the castle is positioned at the level end
**When** the player character touches the castle
**Then** the level completion is detected
**And** visual feedback is provided for successful completion

### Story 3.4: Implement Fall Detection System

**As a** player,
**I want** the system to detect when I fall off the screen,
**So that** I can respawn and try again without frustration.

**Acceptance Criteria:**

**Given** the screen boundaries are defined
**When** the character position exceeds screen limits
**Then** fall detection triggers immediately
**And** the player respawns at the start point

### Story 3.5: Implement Respawn System

**As a** player,
**I want** to instantly respawn at the start point after falling,
**So that** I can quickly retry without losing progress.

**Acceptance Criteria:**

**Given** fall detection is triggered
**When** respawn is initiated
**Then** the character instantly appears at the spawn point
**And** the game state is reset for the new attempt

## Epic 4: Input System

**Goal:** Implement cross-platform input handling for desktop and mobile

### Story 4.1: Implement Keyboard Input Handler

**As a** desktop player,
**I want** to control the character using arrow keys and spacebar,
**So that** I have precise control for platformer gameplay.

**Acceptance Criteria:**

**Given** keyboard input is available
**When** I press left/right arrow keys
**Then** the character moves in the corresponding direction
**And** spacebar triggers jump action with immediate feedback

### Story 4.2: Implement Touch Input Handler

**As a** mobile player,
**I want** to control the character using touch-based virtual controls,
**So that** I can play the game on mobile devices.

**Acceptance Criteria:**

**Given** touch input is detected
**When** I touch the virtual controls
**Then** the character responds appropriately to touch gestures
**And** touch controls are responsive and intuitive

### Story 4.3: Implement Input Device Detection

**As a** system,
**I want** to detect whether the user is on desktop or mobile,
**So that** the appropriate input controls are displayed.

**Acceptance Criteria:**

**Given** the game starts or device changes
**When** the input capabilities are checked
**Then** the correct input method is automatically selected
**And** UI adapts to the detected platform

### Story 4.4: Implement Visual Feedback System

**As a** player,
**I want** to see immediate visual feedback for my input actions,
**So that** I know my controls are working properly.

**Acceptance Criteria:**

**Given** any input action is performed
**When** the system processes the input
**Then** visual feedback is provided immediately
**And** the feedback confirms the action was successful

## Epic 5: Game State Management

**Goal:** Manage game phases and overall game flow

### Story 5.1: Implement State Machine Framework

**As a** developer,
**I want** to create a state machine for game phase management,
**So that** game flow is properly controlled and transitions are smooth.

**Acceptance Criteria:**

**Given** the state machine is implemented
**When** game events occur (start, complete, restart)
**Then** state transitions happen correctly
**And** each state has clear entry and exit conditions

### Story 5.2: Implement Game Phase Management

**As a** player,
**I want** to experience distinct game phases (menu, playing, completed),
**So that** the game flow is clear and intuitive.

**Acceptance Criteria:**

**Given** the game starts
**When** I navigate through different game phases
**Then** each phase has appropriate UI and behavior
**And** transitions between phases are smooth

### Story 5.3: Implement Player Position Tracking

**As a** system,
**I want** to track the player's position within the game world,
**So that** game logic can respond to player location accurately.

**Acceptance Criteria:**

**Given** the player moves through the level
**When** position tracking is active
**Then** the current coordinates are always accurate
**And** position data is available to all systems that need it

### Story 5.4: Implement Instant Restart Functionality

**As a** player,
**I want** to instantly restart the game at any time,
**So that** I can quickly retry without waiting.

**Acceptance Criteria:**

**Given** restart is requested (via input or menu)
**When** the restart action is processed
**Then** the game immediately resets to initial state
**And** the player respawns at the start point

## Epic 6: Rendering System

**Goal:** Create visual output using polygon graphics with responsive design

### Story 6.1: Implement Polygon Rendering System

**As a** developer,
**I want** to render game objects using simple polygon graphics,
**So that** the game has a clean, minimalist visual style without external assets.

**Acceptance Criteria:**

**Given** rendering system is implemented
**When** game objects need to be displayed
**Then** they are rendered as simple polygons
**And** the visual style is consistent across all game objects

### Story 6.2: Implement Responsive Design System

**As a** player,
**I want** the game to adapt to different screen sizes,
**So that** I can play on both desktop and mobile devices.

**Acceptance Criteria:**

**Given** the game runs on different screen sizes
**When** the viewport changes
**Then** the game scales appropriately
**And** gameplay experience remains consistent

### Story 6.3: Implement Cross-Platform Consistency

**As a** player,
**I want** the game experience to be consistent across platforms,
**So that** I get the same quality of gameplay regardless of device.

**Acceptance Criteria:**

**Given** the game runs on desktop vs mobile
**When** comparing gameplay experiences
**Then** controls, physics, and visual output are consistent
**And** performance targets are met on both platforms
