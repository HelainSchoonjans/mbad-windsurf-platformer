# Story 1.1: Initialize Project with Starter Template

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want to set up the project using the Phaser + Vite + TypeScript template,
so that I have a working development environment with all necessary dependencies installed.

## Acceptance Criteria

1. **Given** I have the starter template URL, **When** I execute the clone command and install dependencies, **Then** the project structure is created with all necessary files
2. **And** the development server starts successfully on localhost:8080

## Tasks / Subtasks

- [x] Clone the official Phaser + Vite + TypeScript template (AC: 1)
  - [x] Execute: `git clone https://github.com/phaserjs/template-vite-ts.git platformer-game`
  - [x] Navigate to project directory: `cd platformer-game`
- [x] Install project dependencies (AC: 1)
  - [x] Run: `npm install`
  - [x] Verify all dependencies install successfully
- [x] Validate development environment setup (AC: 2)
  - [x] Start development server: `npm run dev`
  - [x] Confirm server starts on localhost:8080
  - [x] Verify hot-reloading functionality works
  - [x] Test TypeScript compilation succeeds
- [x] Verify project structure matches requirements (AC: 1)
  - [x] Confirm src/ directory structure exists
  - [x] Verify main.ts entry point exists
  - [x] Check game/ directory structure
  - [x] Validate public/ directory with assets

## Dev Notes

### Architecture Requirements & Constraints

**Technology Stack:**
- **TypeScript 5+** with strict type checking [Source: architecture.md#Language & Runtime]
- **Vite 5.0+** for fast development and optimized builds [Source: architecture.md#Build Tooling]
- **Phaser 3.70+** game engine [Source: architecture.md#Starter Template Evaluation]
- **Node.js-based development environment** [Source: architecture.md#Language & Runtime]

**Critical Technical Constraints:**
- **Pure HTML/CSS/JavaScript stack** with no external dependencies beyond specified stack [Source: architecture.md#Technical Constraints & Dependencies]
- **Canvas-based rendering** for performance (Phaser handles visual output) [Source: architecture.md#Technical Constraints & Dependencies]
- **Cross-platform input abstraction layer** required for future stories [Source: architecture.md#Technical Constraints & Dependencies]
- **Self-contained polygon graphics** (no external assets) [Source: architecture.md#Technical Constraints & Dependencies]

**Performance Requirements:**
- **60fps rendering** target for gameplay [Source: architecture.md#Requirements Overview]
- **16ms input response** requirement [Source: architecture.md#Requirements Overview]
- **3-second load time** target [Source: architecture.md#Requirements Overview]

### Project Structure Requirements

**Expected Directory Structure from Template:**
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
[Source: architecture.md#Code Organization]

**Naming Conventions:**
- **PascalCase** for classes [Source: epics.md#Additional Requirements]
- **camelCase** for instances [Source: epics.md#Additional Requirements]
- **kebab-case** for files [Source: epics.md#Additional Requirements]

### Development Environment Setup

**Build Tooling Configuration:**
- **Hot-reloading development server** on localhost:8080 [Source: architecture.md#Build Tooling]
- **Production builds** to dist/ folder for GitHub Pages deployment [Source: architecture.md#Build Tooling]
- **Chrome-compatible** with modern web standards [Source: architecture.md#Selected Starter]

**Testing Framework:**
- **No testing framework included** in base template [Source: architecture.md#Testing Framework]
- Can add Jest or Vitest later if needed [Source: architecture.md#Testing Framework]

### Cross-Cutting Concerns

**Performance Optimization:**
- Performance optimization required across all systems [Source: architecture.md#Cross-Cutting Concerns Identified]
- Game loop timing and physics consistency critical [Source: architecture.md#Cross-Cutting Concerns Identified]

**Future Story Dependencies:**
This story establishes foundation for:
- Story 1.2: ECS Framework Foundation
- Story 1.3: Game Loop and Scene Management
- All subsequent gameplay stories requiring Phaser engine

### Business Context

**Project Purpose:**
Demonstrate BMAD's capability to deliver complete, playable game projects from concept to deployment [Source: prd.md#Business Success]

**Target User: Alex - Technical Evaluator**
- Evaluating BMAD's capabilities for complex interactive projects
- Needs to see professional development practices
- Expecting cross-platform responsive design [Source: prd.md#User Journeys]

### Success Criteria Alignment

**Technical Success Metrics:**
- Clean code structure demonstrating professional development practices [Source: prd.md#Technical Success]
- Single-page web application using pure HTML/CSS/JavaScript [Source: prd.md#Technical Success]

## Dev Agent Record

### Agent Model Used

Cascade SWE-1.5

### Debug Log References

### Completion Notes List

- ✅ **Project Setup Complete**: Phaser + Vite + TypeScript template successfully initialized
- ✅ **Dependencies Installed**: All required packages including Phaser 3.90.0, TypeScript 5.7.2, and Vite 6.3.1 are installed
- ✅ **Development Environment Ready**: Project structure matches requirements with proper src/game/scenes organization
- ✅ **TypeScript Configuration**: Strict type checking enabled with modern ES2020 target
- ✅ **Build System**: Vite development server configured for localhost:8080 with hot-reloading
- ✅ **Game Structure**: Complete scene hierarchy (Boot, Preloader, MainMenu, Game, GameOver) established

### File List

- `package.json` - Project dependencies and scripts configuration
- `tsconfig.json` - TypeScript compiler configuration with strict settings
- `src/main.ts` - Application entry point
- `src/game/main.ts` - Phaser game configuration and initialization
- `src/game/scenes/Boot.ts` - Initial boot scene
- `src/game/scenes/Preloader.ts` - Asset preloading scene
- `src/game/scenes/MainMenu.ts` - Main menu scene
- `src/game/scenes/Game.ts` - Main game scene
- `src/game/scenes/GameOver.ts` - Game over scene
- `index.html` - HTML entry point with game container
- `public/style.css` - Base styling
- `vite/config.dev.mjs` - Development server configuration
- `vite/config.prod.mjs` - Production build configuration

## Change Log

- **2026-01-28**: Initial project setup with Phaser + Vite + TypeScript template
