# ECS Framework Testing Guide

This guide explains how to test the ECS framework and run the comprehensive unit tests.

## 🚀 Quick Start

### 1. Install Testing Dependencies

First, install the testing packages (already added to package.json):

```bash
npm install
```

### 2. Run All Tests

```bash
# Run tests in watch mode
npm run test

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage

# Run tests with UI interface
npm run test:ui
```

## 📁 Test Structure

```
src/test/
├── setup.ts                    # Test configuration and mocks
├── ecs/
│   ├── entity.test.ts          # Entity class tests
│   ├── components.test.ts      # Component tests
│   ├── systems.test.ts         # System tests
│   ├── ecs-manager.test.ts     # ECS Manager tests
│   ├── entity-factory.test.ts  # Entity Factory tests
│   └── integration.test.ts     # End-to-end integration tests
```

## 🧪 Test Categories

### 1. Unit Tests

**Entity Tests** (`entity.test.ts`)
- Entity creation and ID management
- Component addition, retrieval, and removal
- Component type safety
- Edge cases and error handling

**Component Tests** (`components.test.ts`)
- PositionComponent functionality
- VelocityComponent with acceleration
- RenderComponent visual properties
- Default values and validation

**System Tests** (`systems.test.ts`)
- MovementSystem position updates
- RenderSystem rendering logic
- Entity filtering and management
- System lifecycle operations

**ECS Manager Tests** (`ecs-manager.test.ts`)
- Entity lifecycle management
- Component registry and queries
- System registration and updates
- Statistics and cleanup

**Entity Factory Tests** (`entity-factory.test.ts`)
- Factory method correctness
- Default parameter handling
- Component composition
- Entity uniqueness

### 2. Integration Tests

**Integration Tests** (`integration.test.ts`)
- Complete ECS workflow
- Real-world game scenarios
- Performance testing
- Edge case handling

## 🔧 Testing Features

### Mocked Phaser Dependencies

The tests use mocked Phaser objects to avoid requiring the full game engine:

```typescript
// Mocked in setup.ts
global.Phaser = {
  GameObjects: {
    Graphics: class MockGraphics {
      clear() {}
      fillStyle() {}
      fillRect() {}
    }
  }
};
```

### Custom Matchers

Custom Vitest matchers for ECS validation:

```typescript
expect(component).toBeComponent();
expect(system).toBeSystem();
```

### Performance Testing

Tests include performance scenarios:
- 100+ entities in a single update cycle
- Multiple frame updates
- Memory cleanup validation

## 📊 Coverage Report

Run coverage to see test completeness:

```bash
npm run test:coverage
```

Coverage includes:
- All ECS framework files
- Component and system logic
- Error handling paths
- Edge case scenarios

## 🎯 Test Examples

### Basic Entity Test

```typescript
it('should add and retrieve components', () => {
  const entity = new Entity();
  const position = new PositionComponent(10, 20);
  
  entity.addComponent(position);
  
  const retrieved = entity.getComponent<PositionComponent>('position');
  expect(retrieved).toBe(position);
  expect(retrieved?.x).toBe(10);
  expect(retrieved?.y).toBe(20);
});
```

### System Integration Test

```typescript
it('should update position based on velocity', () => {
  const entity = new Entity();
  entity.addComponent(new PositionComponent(100, 200));
  entity.addComponent(new VelocityComponent(50, -30));
  
  movementSystem.addEntity(entity);
  movementSystem.update(0.1); // 100ms
  
  const position = entity.getComponent<PositionComponent>('position')!;
  expect(position.x).toBe(105); // 100 + (50 * 0.1)
  expect(position.y).toBe(197); // 200 + (-30 * 0.1)
});
```

### End-to-End Test

```typescript
it('should create, update, and render entities through ECS', () => {
  const player = EntityFactory.createPlayer(100, 200);
  ecsManager.addEntity(player);
  
  // Add velocity for movement
  ecsManager.addComponent(player.getId(), velocityComponent);
  
  // Update ECS for one frame
  ecsManager.update(0.016);
  
  // Verify results
  const position = player.getComponent<PositionComponent>('position')!;
  expect(position.x).toBeCloseTo(100.8, 1);
});
```

## 🐛 Debugging Tests

### 1. Console Logging

Tests include console.log for debugging:

```typescript
console.log('ECS initialized with entities:', ecsManager.getStats());
```

### 2. Test UI

Use the test UI for interactive debugging:

```bash
npm run test:ui
```

### 3. Individual Test Files

Run specific test files:

```bash
npm test entity.test.ts
npm test integration.test.ts
```

## 📈 Performance Benchmarks

The tests include performance validation:

- **100 entities**: Should update in < 16ms (60fps target)
- **Memory cleanup**: No memory leaks after entity removal
- **Component queries**: Efficient lookup even with many entities

## 🔍 Test Scenarios Covered

### ✅ Core Functionality
- Entity creation and management
- Component CRUD operations
- System updates and filtering
- ECS coordination

### ✅ Edge Cases
- Invalid entity IDs
- Missing components
- Empty ECS state
- Large entity counts

### ✅ Integration
- Complete game loop simulation
- Real-world platformer scenario
- Dynamic component changes
- System coordination

### ✅ Performance
- 60fps update targets
- Memory management
- Efficient queries
- Scalability testing

## 🚨 Common Issues

### TypeScript Errors
TypeScript errors are expected before installing dependencies:

```bash
npm install  # This resolves most TypeScript errors
```

### Mock Dependencies
Tests use mocked Phaser objects - no game engine required for testing.

### Test Environment
Tests run in jsdom environment - no browser needed.

## 📝 Next Steps

1. **Run the tests**: `npm run test`
2. **Check coverage**: `npm run test:coverage`
3. **Add new tests**: Follow existing patterns
4. **Update tests**: When adding new ECS features

The comprehensive test suite ensures the ECS framework is reliable, performant, and ready for game development!
