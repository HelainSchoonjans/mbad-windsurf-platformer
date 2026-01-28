// Test setup file for Vitest
// This file runs before each test file

import { vi, expect } from 'vitest';

// Mock Phaser for testing ECS components without needing the full game engine
vi.stubGlobal('Phaser', {
  GameObjects: {
    Graphics: class MockGraphics {
      clear() {}
      fillStyle() {}
      fillRect() {}
    }
  }
});

// Add custom matchers if needed
expect.extend({
  toBeComponent(received: any) {
    const pass = received && typeof received === 'object' && 'type' in received;
    return {
      message: () => `expected ${received} to be a component`,
      pass,
    };
  },
  toBeSystem(received: any) {
    const pass = received && typeof received === 'object' && 'type' in received && 'update' in received;
    return {
      message: () => `expected ${received} to be a system`,
      pass,
    };
  }
});

declare global {
  namespace Vi {
    interface Assertion {
      toBeComponent(): any;
      toBeSystem(): any;
    }
  }
}
