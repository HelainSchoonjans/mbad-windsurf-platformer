import { describe, it, expect } from 'vitest';
import { EntityFactory } from '../../game/ecs/entities/entity-factory';
import { PositionComponent } from '../../game/ecs/components/position-component';
import { VelocityComponent } from '../../game/ecs/components/velocity-component';
import { RenderComponent } from '../../game/ecs/components/render-component';

describe('EntityFactory', () => {
  describe('createPlayer', () => {
    it('should create player with default values', () => {
      const player = EntityFactory.createPlayer();
      
      expect(player.getId()).toBeGreaterThanOrEqual(0);
      
      const position = player.getComponent<PositionComponent>('position');
      const velocity = player.getComponent<VelocityComponent>('velocity');
      const render = player.getComponent<RenderComponent>('render');
      
      expect(position).toBeDefined();
      expect(position?.x).toBe(0);
      expect(position?.y).toBe(0);
      
      expect(velocity).toBeDefined();
      expect(velocity?.vx).toBe(0);
      expect(velocity?.vy).toBe(0);
      
      expect(render).toBeDefined();
      expect(render?.width).toBe(32);
      expect(render?.height).toBe(32);
      expect(render?.color).toBe('#0066ff');
      expect(render?.visible).toBe(true);
      expect(render?.depth).toBe(1);
    });

    it('should create player with custom values', () => {
      const player = EntityFactory.createPlayer(100, 200, 64, 48, '#ff0000');
      
      const position = player.getComponent<PositionComponent>('position');
      const render = player.getComponent<RenderComponent>('render');
      
      expect(position?.x).toBe(100);
      expect(position?.y).toBe(200);
      expect(render?.width).toBe(64);
      expect(render?.height).toBe(48);
      expect(render?.color).toBe('#ff0000');
    });

    it('should create player with all required components', () => {
      const player = EntityFactory.createPlayer();
      
      expect(player.hasComponent('position')).toBe(true);
      expect(player.hasComponent('velocity')).toBe(true);
      expect(player.hasComponent('render')).toBe(true);
    });
  });

  describe('createPlatform', () => {
    it('should create platform with specified values', () => {
      const platform = EntityFactory.createPlatform(50, 100, 200, 20, '#00ff00');
      
      const position = platform.getComponent<PositionComponent>('position');
      const render = platform.getComponent<RenderComponent>('render');
      
      expect(position?.x).toBe(50);
      expect(position?.y).toBe(100);
      
      expect(render?.width).toBe(200);
      expect(render?.height).toBe(20);
      expect(render?.color).toBe('#00ff00');
      expect(render?.visible).toBe(true);
      expect(render?.depth).toBe(0);
    });

    it('should create platform with default color', () => {
      const platform = EntityFactory.createPlatform(0, 0, 100, 10);
      
      const render = platform.getComponent<RenderComponent>('render');
      expect(render?.color).toBe('#666666');
    });

    it('should create platform with position and render components only', () => {
      const platform = EntityFactory.createPlatform(0, 0, 100, 10);
      
      expect(platform.hasComponent('position')).toBe(true);
      expect(platform.hasComponent('render')).toBe(true);
      expect(platform.hasComponent('velocity')).toBe(false);
    });
  });

  describe('createCastle', () => {
    it('should create castle with default values', () => {
      const castle = EntityFactory.createCastle();
      
      const position = castle.getComponent<PositionComponent>('position');
      const render = castle.getComponent<RenderComponent>('render');
      
      expect(position?.x).toBe(0);
      expect(position?.y).toBe(0);
      
      expect(render?.width).toBe(64);
      expect(render?.height).toBe(64);
      expect(render?.color).toBe('#ffd700');
      expect(render?.visible).toBe(true);
      expect(render?.depth).toBe(2);
    });

    it('should create castle with custom values', () => {
      const castle = EntityFactory.createCastle(300, 150, 128, 96, '#silver');
      
      const position = castle.getComponent<PositionComponent>('position');
      const render = castle.getComponent<RenderComponent>('render');
      
      expect(position?.x).toBe(300);
      expect(position?.y).toBe(150);
      expect(render?.width).toBe(128);
      expect(render?.height).toBe(96);
      expect(render?.color).toBe('#silver');
    });

    it('should create castle with position and render components only', () => {
      const castle = EntityFactory.createCastle();
      
      expect(castle.hasComponent('position')).toBe(true);
      expect(castle.hasComponent('render')).toBe(true);
      expect(castle.hasComponent('velocity')).toBe(false);
    });
  });

  describe('createMovingPlatform', () => {
    it('should create moving platform with specified values', () => {
      const platform = EntityFactory.createMovingPlatform(100, 200, 150, 15, 25, -10, '#8b4513');
      
      const position = platform.getComponent<PositionComponent>('position');
      const velocity = platform.getComponent<VelocityComponent>('velocity');
      const render = platform.getComponent<RenderComponent>('render');
      
      expect(position?.x).toBe(100);
      expect(position?.y).toBe(200);
      
      expect(velocity?.vx).toBe(25);
      expect(velocity?.vy).toBe(-10);
      
      expect(render?.width).toBe(150);
      expect(render?.height).toBe(15);
      expect(render?.color).toBe('#8b4513');
    });

    it('should create moving platform with default values', () => {
      const platform = EntityFactory.createMovingPlatform(0, 0, 100, 10);
      
      const velocity = platform.getComponent<VelocityComponent>('velocity');
      const render = platform.getComponent<RenderComponent>('render');
      
      expect(velocity?.vx).toBe(0);
      expect(velocity?.vy).toBe(0);
      expect(render?.color).toBe('#8b4513');
    });

    it('should create moving platform with all required components', () => {
      const platform = EntityFactory.createMovingPlatform(0, 0, 100, 10);
      
      expect(platform.hasComponent('position')).toBe(true);
      expect(platform.hasComponent('velocity')).toBe(true);
      expect(platform.hasComponent('render')).toBe(true);
    });
  });

  describe('createDecoration', () => {
    it('should create decoration with specified values', () => {
      const decoration = EntityFactory.createDecoration(75, 125, 20, 30, '#ff00ff', 5);
      
      const position = decoration.getComponent<PositionComponent>('position');
      const render = decoration.getComponent<RenderComponent>('render');
      
      expect(position?.x).toBe(75);
      expect(position?.y).toBe(125);
      
      expect(render?.width).toBe(20);
      expect(render?.height).toBe(30);
      expect(render?.color).toBe('#ff00ff');
      expect(render?.visible).toBe(true);
      expect(render?.depth).toBe(5);
    });

    it('should create decoration with default depth', () => {
      const decoration = EntityFactory.createDecoration(0, 0, 10, 10, '#ffffff');
      
      const render = decoration.getComponent<RenderComponent>('render');
      expect(render?.depth).toBe(0);
    });

    it('should create decoration with position and render components only', () => {
      const decoration = EntityFactory.createDecoration(0, 0, 10, 10, '#ffffff');
      
      expect(decoration.hasComponent('position')).toBe(true);
      expect(decoration.hasComponent('render')).toBe(true);
      expect(decoration.hasComponent('velocity')).toBe(false);
    });
  });

  describe('createText', () => {
    it('should create text entity with specified values', () => {
      const text = EntityFactory.createText(200, 300, 'Hello World', '#000000');
      
      const position = text.getComponent<PositionComponent>('position');
      const render = text.getComponent<RenderComponent>('render');
      
      expect(position?.x).toBe(200);
      expect(position?.y).toBe(300);
      
      expect(render?.color).toBe('#000000');
      expect(render?.visible).toBe(true);
      expect(render?.depth).toBe(10);
    });

    it('should create text with default color', () => {
      const text = EntityFactory.createText(0, 0, 'Test');
      
      const render = text.getComponent<RenderComponent>('render');
      expect(render?.color).toBe('#ffffff');
    });

    it('should create text with position and render components only', () => {
      const text = EntityFactory.createText(0, 0, 'Test');
      
      expect(text.hasComponent('position')).toBe(true);
      expect(text.hasComponent('render')).toBe(true);
      expect(text.hasComponent('velocity')).toBe(false);
    });
  });

  describe('Factory Pattern Consistency', () => {
    it('should create entities with unique IDs', () => {
      const player = EntityFactory.createPlayer();
      const platform = EntityFactory.createPlatform(0, 0, 100, 10);
      const castle = EntityFactory.createCastle();
      
      expect(player.getId()).not.toBe(platform.getId());
      expect(platform.getId()).not.toBe(castle.getId());
      expect(player.getId()).not.toBe(castle.getId());
    });

    it('should create entities that are all Entity instances', () => {
      const player = EntityFactory.createPlayer();
      const platform = EntityFactory.createPlatform(0, 0, 100, 10);
      const castle = EntityFactory.createCastle();
      const movingPlatform = EntityFactory.createMovingPlatform(0, 0, 100, 10);
      const decoration = EntityFactory.createDecoration(0, 0, 10, 10, '#ffffff');
      const text = EntityFactory.createText(0, 0, 'Test');
      
      expect(player.constructor.name).toBe('Entity');
      expect(platform.constructor.name).toBe('Entity');
      expect(castle.constructor.name).toBe('Entity');
      expect(movingPlatform.constructor.name).toBe('Entity');
      expect(decoration.constructor.name).toBe('Entity');
      expect(text.constructor.name).toBe('Entity');
    });
  });
});
