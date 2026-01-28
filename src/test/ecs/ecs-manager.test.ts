import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ECSManager } from '../../game/ecs/ecs-manager';
import { Entity } from '../../game/ecs/entities/entity';
import { PositionComponent } from '../../game/ecs/components/position-component';
import { VelocityComponent } from '../../game/ecs/components/velocity-component';
import { MovementSystem } from '../../game/ecs/systems/movement-system';
import { RenderSystem } from '../../game/ecs/systems/render-system';

describe('ECSManager', () => {
  let ecsManager: ECSManager;

  beforeEach(() => {
    ecsManager = new ECSManager();
  });

  describe('Entity Management', () => {
    it('should create new entity', () => {
      const entity = ecsManager.createEntity();
      
      expect(entity).toBeInstanceOf(Entity);
      expect(entity.getId()).toBeGreaterThanOrEqual(0);
    });

    it('should create entities with unique IDs', () => {
      const entity1 = ecsManager.createEntity();
      const entity2 = ecsManager.createEntity();
      
      expect(entity1.getId()).toBeGreaterThanOrEqual(0);
      expect(entity2.getId()).toBe(entity1.getId() + 1);
      expect(entity1.getId()).not.toBe(entity2.getId());
    });

    it('should add existing entity', () => {
      const entity = new Entity();
      
      ecsManager.addEntity(entity);
      
      expect(ecsManager.getEntity(entity.getId())).toBe(entity);
    });

    it('should remove entity', () => {
      const entity = ecsManager.createEntity();
      
      const removed = ecsManager.removeEntity(entity.getId());
      expect(removed).toBe(true);
      expect(ecsManager.getEntity(entity.getId())).toBeUndefined();
    });

    it('should return false when removing non-existent entity', () => {
      const removed = ecsManager.removeEntity(999);
      expect(removed).toBe(false);
    });

    it('should get all entities', () => {
      const entity1 = ecsManager.createEntity();
      const entity2 = ecsManager.createEntity();
      
      const entities = ecsManager.getAllEntities();
      expect(entities).toHaveLength(2);
      expect(entities).toContain(entity1);
      expect(entities).toContain(entity2);
    });
  });

  describe('Component Management', () => {
    let entity: Entity;

    beforeEach(() => {
      entity = ecsManager.createEntity();
    });

    it('should add component to entity', () => {
      const position = new PositionComponent(10, 20);
      
      ecsManager.addComponent(entity.getId(), position);
      
      const retrieved = ecsManager.getComponent<PositionComponent>(entity.getId(), 'position');
      expect(retrieved).toBe(position);
      expect(retrieved?.x).toBe(10);
      expect(retrieved?.y).toBe(20);
    });

    it('should remove component from entity', () => {
      const position = new PositionComponent();
      
      ecsManager.addComponent(entity.getId(), position);
      const removed = ecsManager.removeComponent(entity.getId(), 'position');
      
      expect(removed).toBe(true);
      expect(ecsManager.getComponent(entity.getId(), 'position')).toBeUndefined();
    });

    it('should return false when removing non-existent component', () => {
      const removed = ecsManager.removeComponent(entity.getId(), 'position');
      expect(removed).toBe(false);
    });

    it('should get entities with specific component type', () => {
      const entity1 = ecsManager.createEntity();
      const entity2 = ecsManager.createEntity();
      const entity3 = ecsManager.createEntity();
      
      const position1 = new PositionComponent(10, 20);
      const position2 = new PositionComponent(30, 40);
      const velocity = new VelocityComponent(5, 10);
      
      ecsManager.addComponent(entity1.getId(), position1);
      ecsManager.addComponent(entity2.getId(), position2);
      ecsManager.addComponent(entity3.getId(), velocity);
      
      const entitiesWithPosition = ecsManager.getEntitiesWithComponent('position');
      expect(entitiesWithPosition).toHaveLength(2);
      expect(entitiesWithPosition).toContain(entity1);
      expect(entitiesWithPosition).toContain(entity2);
      expect(entitiesWithPosition).not.toContain(entity3);
    });

    it('should return empty array for non-existent component type', () => {
      const entities = ecsManager.getEntitiesWithComponent('nonexistent');
      expect(entities).toEqual([]);
    });
  });

  describe('System Management', () => {
    let movementSystem: MovementSystem;
    let renderSystem: RenderSystem;

    beforeEach(() => {
      movementSystem = new MovementSystem();
      renderSystem = new RenderSystem();
    });

    it('should register system', () => {
      ecsManager.registerSystem(movementSystem);
      
      expect(ecsManager.getSystem('movement')).toBe(movementSystem);
    });

    it('should unregister system', () => {
      ecsManager.registerSystem(movementSystem);
      
      const removed = ecsManager.unregisterSystem('movement');
      expect(removed).toBe(true);
      expect(ecsManager.getSystem('movement')).toBeUndefined();
    });

    it('should return false when unregistering non-existent system', () => {
      const removed = ecsManager.unregisterSystem('nonexistent');
      expect(removed).toBe(false);
    });
  });

  describe('System Updates', () => {
    let movementSystem: MovementSystem;
    let entity: Entity;

    beforeEach(() => {
      movementSystem = new MovementSystem();
      entity = ecsManager.createEntity();
      
      ecsManager.registerSystem(movementSystem);
    });

    it('should update all systems', () => {
      const updateSpy = vi.spyOn(movementSystem, 'update');
      
      ecsManager.update(0.016);
      
      expect(updateSpy).toHaveBeenCalledWith(0.016);
    });

    it('should update systems with deltaTime', () => {
      const position = new PositionComponent(100, 200);
      const velocity = new VelocityComponent(50, 30);
      
      ecsManager.addComponent(entity.getId(), position);
      ecsManager.addComponent(entity.getId(), velocity);
      
      ecsManager.update(0.1); // 100ms
      
      expect(position.x).toBe(105); // 100 + (50 * 0.1)
      expect(position.y).toBe(203); // 200 + (30 * 0.1)
    });
  });

  describe('Entity-System Integration', () => {
    let movementSystem: MovementSystem;
    let entity: Entity;

    beforeEach(() => {
      movementSystem = new MovementSystem();
      entity = ecsManager.createEntity();
      ecsManager.registerSystem(movementSystem);
    });

    it('should automatically add entity to system when component added', () => {
      const position = new PositionComponent();
      const velocity = new VelocityComponent();
      
      ecsManager.addComponent(entity.getId(), position);
      ecsManager.addComponent(entity.getId(), velocity);
      
      expect(movementSystem.getEntities()).toContain(entity);
    });

    it('should automatically remove entity from system when component removed', () => {
      const position = new PositionComponent();
      const velocity = new VelocityComponent();
      
      ecsManager.addComponent(entity.getId(), position);
      ecsManager.addComponent(entity.getId(), velocity);
      expect(movementSystem.getEntities()).toContain(entity);
      
      ecsManager.removeComponent(entity.getId(), 'position');
      expect(movementSystem.getEntities()).not.toContain(entity);
    });

    it('should automatically remove entity from system when entity removed', () => {
      const position = new PositionComponent();
      const velocity = new VelocityComponent();
      
      ecsManager.addComponent(entity.getId(), position);
      ecsManager.addComponent(entity.getId(), velocity);
      expect(movementSystem.getEntities()).toContain(entity);
      
      ecsManager.removeEntity(entity.getId());
      expect(movementSystem.getEntities()).not.toContain(entity);
    });
  });

  describe('Statistics', () => {
    it('should return correct statistics', () => {
      const entity1 = ecsManager.createEntity();
      const entity2 = ecsManager.createEntity();
      const movementSystem = new MovementSystem();
      
      ecsManager.addComponent(entity1.getId(), new PositionComponent());
      ecsManager.addComponent(entity1.getId(), new VelocityComponent());
      ecsManager.addComponent(entity2.getId(), new PositionComponent());
      ecsManager.registerSystem(movementSystem);
      
      const stats = ecsManager.getStats();
      
      expect(stats.entityCount).toBe(2);
      expect(stats.componentCount).toBe(3); // 2 position + 1 velocity
      expect(stats.systemCount).toBe(1);
      expect(stats.componentTypes).toEqual(['position', 'velocity']);
      expect(stats.systemTypes).toEqual(['movement']);
    });

    it('should return empty statistics for empty manager', () => {
      const stats = ecsManager.getStats();
      
      expect(stats.entityCount).toBe(0);
      expect(stats.componentCount).toBe(0);
      expect(stats.systemCount).toBe(0);
      expect(stats.componentTypes).toEqual([]);
      expect(stats.systemTypes).toEqual([]);
    });
  });

  describe('Clear', () => {
    it('should clear all entities, components, and systems', () => {
      const entity1 = ecsManager.createEntity();
      const entity2 = ecsManager.createEntity();
      const movementSystem = new MovementSystem();
      
      ecsManager.addComponent(entity1.getId(), new PositionComponent());
      ecsManager.addComponent(entity2.getId(), new VelocityComponent());
      ecsManager.registerSystem(movementSystem);
      
      ecsManager.clear();
      
      expect(ecsManager.getAllEntities()).toEqual([]);
      expect(ecsManager.getStats().entityCount).toBe(0);
      expect(ecsManager.getStats().componentCount).toBe(0);
      expect(ecsManager.getStats().systemCount).toBe(1); // Systems remain
    });
  });
});
