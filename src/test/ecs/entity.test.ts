import { describe, it, expect, beforeEach } from 'vitest';
import { Entity } from '../../game/ecs/entities/entity';
import { PositionComponent } from '../../game/ecs/components/position-component';
import { VelocityComponent } from '../../game/ecs/components/velocity-component';

describe('Entity', () => {
  let entity: Entity;

  beforeEach(() => {
    entity = new Entity();
  });

  describe('Constructor', () => {
    it('should create entity with unique ID', () => {
      const entity1 = new Entity();
      const entity2 = new Entity();
      
      expect(entity1.getId()).toBeGreaterThanOrEqual(0);
      expect(entity2.getId()).toBe(entity1.getId() + 1);
      expect(entity1.getId()).not.toBe(entity2.getId());
    });
  });

  describe('Component Management', () => {
    it('should add and retrieve components', () => {
      const position = new PositionComponent(10, 20);
      
      entity.addComponent(position);
      
      const retrieved = entity.getComponent<PositionComponent>('position');
      expect(retrieved).toBe(position);
      expect(retrieved?.x).toBe(10);
      expect(retrieved?.y).toBe(20);
    });

    it('should return undefined for non-existent component', () => {
      const result = entity.getComponent<PositionComponent>('position');
      expect(result).toBeUndefined();
    });

    it('should check if component exists', () => {
      const position = new PositionComponent();
      
      expect(entity.hasComponent('position')).toBe(false);
      
      entity.addComponent(position);
      expect(entity.hasComponent('position')).toBe(true);
    });

    it('should remove components', () => {
      const position = new PositionComponent();
      
      entity.addComponent(position);
      expect(entity.hasComponent('position')).toBe(true);
      
      const removed = entity.removeComponent('position');
      expect(removed).toBe(true);
      expect(entity.hasComponent('position')).toBe(false);
    });

    it('should return false when removing non-existent component', () => {
      const removed = entity.removeComponent('position');
      expect(removed).toBe(false);
    });

    it('should get all component types', () => {
      const position = new PositionComponent();
      const velocity = new VelocityComponent();
      
      expect(entity.getComponentTypes()).toEqual([]);
      
      entity.addComponent(position);
      expect(entity.getComponentTypes()).toEqual(['position']);
      
      entity.addComponent(velocity);
      expect(entity.getComponentTypes()).toEqual(['position', 'velocity']);
    });

    it('should clear all components', () => {
      const position = new PositionComponent();
      const velocity = new VelocityComponent();
      
      entity.addComponent(position);
      entity.addComponent(velocity);
      expect(entity.getComponentTypes()).toHaveLength(2);
      
      entity.clearComponents();
      expect(entity.getComponentTypes()).toEqual([]);
      expect(entity.hasComponent('position')).toBe(false);
      expect(entity.hasComponent('velocity')).toBe(false);
    });

    it('should overwrite component of same type', () => {
      const position1 = new PositionComponent(10, 20);
      const position2 = new PositionComponent(30, 40);
      
      entity.addComponent(position1);
      entity.addComponent(position2);
      
      const retrieved = entity.getComponent<PositionComponent>('position');
      expect(retrieved).toBe(position2);
      expect(retrieved?.x).toBe(30);
      expect(retrieved?.y).toBe(40);
    });
  });

  describe('Component Type Safety', () => {
    it('should maintain type safety with generic getComponent', () => {
      const position = new PositionComponent(100, 200);
      entity.addComponent(position);
      
      const retrieved = entity.getComponent<PositionComponent>('position');
      
      // TypeScript should know this is PositionComponent
      expect(retrieved?.x).toBe(100);
      expect(retrieved?.y).toBe(200);
      expect(retrieved?.setPosition).toBeDefined();
    });
  });
});
