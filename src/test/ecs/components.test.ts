import { describe, it, expect } from 'vitest';
import { PositionComponent } from '../../game/ecs/components/position-component';
import { VelocityComponent } from '../../game/ecs/components/velocity-component';
import { RenderComponent } from '../../game/ecs/components/render-component';

describe('PositionComponent', () => {
  it('should create with default values', () => {
    const position = new PositionComponent();
    
    expect(position.type).toBe('position');
    expect(position.x).toBe(0);
    expect(position.y).toBe(0);
  });

  it('should create with provided values', () => {
    const position = new PositionComponent(100, 200);
    
    expect(position.x).toBe(100);
    expect(position.y).toBe(200);
  });

  it('should set position', () => {
    const position = new PositionComponent();
    
    position.setPosition(50, 75);
    expect(position.x).toBe(50);
    expect(position.y).toBe(75);
  });

  it('should get position as object', () => {
    const position = new PositionComponent(10, 20);
    
    const pos = position.getPosition();
    expect(pos).toEqual({ x: 10, y: 20 });
  });

  it('should be a component', () => {
    const position = new PositionComponent();
    expect(position.type).toBeDefined();
  });
});

describe('VelocityComponent', () => {
  it('should create with default values', () => {
    const velocity = new VelocityComponent();
    
    expect(velocity.type).toBe('velocity');
    expect(velocity.vx).toBe(0);
    expect(velocity.vy).toBe(0);
  });

  it('should create with provided values', () => {
    const velocity = new VelocityComponent(150, -300);
    
    expect(velocity.vx).toBe(150);
    expect(velocity.vy).toBe(-300);
  });

  it('should set velocity', () => {
    const velocity = new VelocityComponent();
    
    velocity.setVelocity(200, 100);
    expect(velocity.vx).toBe(200);
    expect(velocity.vy).toBe(100);
  });

  it('should get velocity as object', () => {
    const velocity = new VelocityComponent(50, -25);
    
    const vel = velocity.getVelocity();
    expect(vel).toEqual({ vx: 50, vy: -25 });
  });

  it('should apply acceleration', () => {
    const velocity = new VelocityComponent(100, 0);
    
    velocity.applyAcceleration(10, -20, 0.5); // 0.5 seconds
    expect(velocity.vx).toBe(105); // 100 + (10 * 0.5)
    expect(velocity.vy).toBe(-10); // 0 + (-20 * 0.5)
  });

  it('should be a component', () => {
    const velocity = new VelocityComponent();
    expect(velocity.type).toBeDefined();
  });
});

describe('RenderComponent', () => {
  it('should create with default values', () => {
    const render = new RenderComponent();
    
    expect(render.type).toBe('render');
    expect(render.width).toBe(32);
    expect(render.height).toBe(32);
    expect(render.color).toBe('#ffffff');
    expect(render.visible).toBe(true);
    expect(render.depth).toBe(0);
  });

  it('should create with provided values', () => {
    const render = new RenderComponent(64, 48, '#ff0000', false, 5);
    
    expect(render.width).toBe(64);
    expect(render.height).toBe(48);
    expect(render.color).toBe('#ff0000');
    expect(render.visible).toBe(false);
    expect(render.depth).toBe(5);
  });

  it('should set dimensions', () => {
    const render = new RenderComponent();
    
    render.setDimensions(100, 80);
    expect(render.width).toBe(100);
    expect(render.height).toBe(80);
  });

  it('should set color', () => {
    const render = new RenderComponent();
    
    render.setColor('#00ff00');
    expect(render.color).toBe('#00ff00');
  });

  it('should set visibility', () => {
    const render = new RenderComponent();
    
    render.setVisible(false);
    expect(render.visible).toBe(false);
    
    render.setVisible(true);
    expect(render.visible).toBe(true);
  });

  it('should set depth', () => {
    const render = new RenderComponent();
    
    render.setDepth(10);
    expect(render.depth).toBe(10);
  });

  it('should get all render properties', () => {
    const render = new RenderComponent(50, 75, '#123456', true, 3);
    
    const props = render.getRenderProperties();
    expect(props).toEqual({
      width: 50,
      height: 75,
      color: '#123456',
      visible: true,
      depth: 3
    });
  });

  it('should be a component', () => {
    const render = new RenderComponent();
    expect(render.type).toBeDefined();
  });
});
