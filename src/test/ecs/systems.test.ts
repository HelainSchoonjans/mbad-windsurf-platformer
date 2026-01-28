import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MovementSystem } from '../../game/ecs/systems/movement-system';
import { RenderSystem } from '../../game/ecs/systems/render-system';
import { Entity } from '../../game/ecs/entities/entity';
import { PositionComponent } from '../../game/ecs/components/position-component';
import { VelocityComponent } from '../../game/ecs/components/velocity-component';
import { RenderComponent } from '../../game/ecs/components/render-component';

describe('MovementSystem', () => {
  let movementSystem: MovementSystem;
  let entity: Entity;

  beforeEach(() => {
    movementSystem = new MovementSystem();
    entity = new Entity();
  });

  it('should be a system', () => {
    expect(movementSystem.type).toBe('movement');
    expect(typeof movementSystem.update).toBe('function');
  });

  it('should add entity with required components', () => {
    entity.addComponent(new PositionComponent(10, 20));
    entity.addComponent(new VelocityComponent(5, 10));
    
    movementSystem.addEntity(entity);
    
    expect(movementSystem.getEntities()).toContain(entity);
  });

  it('should not add entity without position component', () => {
    entity.addComponent(new VelocityComponent(5, 10));
    
    movementSystem.addEntity(entity);
    
    expect(movementSystem.getEntities()).not.toContain(entity);
  });

  it('should not add entity without velocity component', () => {
    entity.addComponent(new PositionComponent(10, 20));
    
    movementSystem.addEntity(entity);
    
    expect(movementSystem.getEntities()).not.toContain(entity);
  });

  it('should remove entity', () => {
    entity.addComponent(new PositionComponent(10, 20));
    entity.addComponent(new VelocityComponent(5, 10));
    
    movementSystem.addEntity(entity);
    expect(movementSystem.getEntities()).toContain(entity);
    
    movementSystem.removeEntity(entity);
    expect(movementSystem.getEntities()).not.toContain(entity);
  });

  it('should update position based on velocity', () => {
    const position = new PositionComponent(100, 200);
    const velocity = new VelocityComponent(50, -30);
    
    entity.addComponent(position);
    entity.addComponent(velocity);
    movementSystem.addEntity(entity);
    
    movementSystem.update(0.1); // 100ms
    
    expect(position.x).toBe(105); // 100 + (50 * 0.1)
    expect(position.y).toBe(197); // 200 + (-30 * 0.1)
  });

  it('should update multiple entities', () => {
    const entity1 = new Entity();
    const entity2 = new Entity();
    
    entity1.addComponent(new PositionComponent(0, 0));
    entity1.addComponent(new VelocityComponent(10, 20));
    
    entity2.addComponent(new PositionComponent(100, 100));
    entity2.addComponent(new VelocityComponent(-5, 10));
    
    movementSystem.addEntity(entity1);
    movementSystem.addEntity(entity2);
    
    movementSystem.update(1.0);
    
    const pos1 = entity1.getComponent<PositionComponent>('position')!;
    const pos2 = entity2.getComponent<PositionComponent>('position')!;
    
    expect(pos1.x).toBe(10);
    expect(pos1.y).toBe(20);
    expect(pos2.x).toBe(95);
    expect(pos2.y).toBe(110);
  });

  it('should clear all entities', () => {
    entity.addComponent(new PositionComponent());
    entity.addComponent(new VelocityComponent());
    
    movementSystem.addEntity(entity);
    expect(movementSystem.getEntities()).toHaveLength(1);
    
    movementSystem.clearEntities();
    expect(movementSystem.getEntities()).toHaveLength(0);
  });
});

describe('RenderSystem', () => {
  let renderSystem: RenderSystem;
  let entity: Entity;
  let mockGraphics: any;

  beforeEach(() => {
    renderSystem = new RenderSystem();
    entity = new Entity();
    
    mockGraphics = {
      clear: vi.fn(),
      fillStyle: vi.fn(),
      fillRect: vi.fn()
    };
    
    renderSystem.setGraphicsContext(mockGraphics);
  });

  it('should be a system', () => {
    expect(renderSystem.type).toBe('render');
    expect(typeof renderSystem.update).toBe('function');
  });

  it('should add entity with required components', () => {
    entity.addComponent(new PositionComponent(10, 20));
    entity.addComponent(new RenderComponent(32, 32, '#ff0000'));
    
    renderSystem.addEntity(entity);
    
    expect(renderSystem.getEntities()).toContain(entity);
  });

  it('should not add entity without position component', () => {
    entity.addComponent(new RenderComponent(32, 32, '#ff0000'));
    
    renderSystem.addEntity(entity);
    
    expect(renderSystem.getEntities()).not.toContain(entity);
  });

  it('should not add entity without render component', () => {
    entity.addComponent(new PositionComponent(10, 20));
    
    renderSystem.addEntity(entity);
    
    expect(renderSystem.getEntities()).not.toContain(entity);
  });

  it('should remove entity', () => {
    entity.addComponent(new PositionComponent(10, 20));
    entity.addComponent(new RenderComponent(32, 32, '#ff0000'));
    
    renderSystem.addEntity(entity);
    expect(renderSystem.getEntities()).toContain(entity);
    
    renderSystem.removeEntity(entity);
    expect(renderSystem.getEntities()).not.toContain(entity);
  });

  it('should sort entities by depth', () => {
    const entity1 = new Entity();
    const entity2 = new Entity();
    const entity3 = new Entity();
    
    entity1.addComponent(new PositionComponent());
    entity1.addComponent(new RenderComponent(32, 32, '#ff0000', true, 5));
    
    entity2.addComponent(new PositionComponent());
    entity2.addComponent(new RenderComponent(32, 32, '#00ff00', true, 1));
    
    entity3.addComponent(new PositionComponent());
    entity3.addComponent(new RenderComponent(32, 32, '#0000ff', true, 3));
    
    renderSystem.addEntity(entity1);
    renderSystem.addEntity(entity2);
    renderSystem.addEntity(entity3);
    
    const entities = renderSystem.getEntities();
    expect(entities[0]).toBe(entity2); // depth 1
    expect(entities[1]).toBe(entity3); // depth 3
    expect(entities[2]).toBe(entity1); // depth 5
  });

  it('should render visible entities', () => {
    entity.addComponent(new PositionComponent(100, 100));
    entity.addComponent(new RenderComponent(50, 30, '#ff0000', true, 0));
    
    renderSystem.addEntity(entity);
    renderSystem.update(0.016); // 16ms
    
    expect(mockGraphics.clear).toHaveBeenCalled();
    expect(mockGraphics.fillStyle).toHaveBeenCalledWith(0xff0000);
    expect(mockGraphics.fillRect).toHaveBeenCalledWith(75, 85, 50, 30); // centered at (100, 100)
  });

  it('should not render invisible entities', () => {
    entity.addComponent(new PositionComponent(100, 100));
    entity.addComponent(new RenderComponent(50, 30, '#ff0000', false, 0));
    
    renderSystem.addEntity(entity);
    renderSystem.update(0.016);
    
    expect(mockGraphics.fillStyle).not.toHaveBeenCalled();
    expect(mockGraphics.fillRect).not.toHaveBeenCalled();
  });

  it('should not render without graphics context', () => {
    renderSystem.setGraphicsContext(null as any);
    
    entity.addComponent(new PositionComponent(100, 100));
    entity.addComponent(new RenderComponent(50, 30, '#ff0000', true, 0));
    
    renderSystem.addEntity(entity);
    
    // Should not throw error
    expect(() => renderSystem.update(0.016)).not.toThrow();
  });

  it('should clear all entities', () => {
    entity.addComponent(new PositionComponent());
    entity.addComponent(new RenderComponent());
    
    renderSystem.addEntity(entity);
    expect(renderSystem.getEntities()).toHaveLength(1);
    
    renderSystem.clearEntities();
    expect(renderSystem.getEntities()).toHaveLength(0);
  });
});
