import { Entity } from './entity';
import { PositionComponent } from '../components/position-component';
import { VelocityComponent } from '../components/velocity-component';
import { RenderComponent } from '../components/render-component';

/**
 * Factory for creating common game entities with predefined components
 */
export class EntityFactory {
  /**
   * Create a player entity with basic components
   * @param x - Initial X position
   * @param y - Initial Y position
   * @param width - Player width (default: 32)
   * @param height - Player height (default: 32)
   * @param color - Player color (default: blue)
   * @returns Player entity
   */
  static createPlayer(
    x: number = 0,
    y: number = 0,
    width: number = 32,
    height: number = 32,
    color: string = '#0066ff'
  ): Entity {
    const player = new Entity();

    // Add position component
    player.addComponent(new PositionComponent(x, y));

    // Add velocity component (starts at rest)
    player.addComponent(new VelocityComponent(0, 0));

    // Add render component
    player.addComponent(new RenderComponent(width, height, color, true, 1));

    return player;
  }

  /**
   * Create a platform entity
   * @param x - Platform X position
   * @param y - Platform Y position
   * @param width - Platform width
   * @param height - Platform height
   * @param color - Platform color (default: gray)
   * @returns Platform entity
   */
  static createPlatform(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string = '#666666'
  ): Entity {
    const platform = new Entity();

    // Add position component
    platform.addComponent(new PositionComponent(x, y));

    // Add render component (platforms don't move, so no velocity component)
    platform.addComponent(new RenderComponent(width, height, color, true, 0));

    return platform;
  }

  /**
   * Create a castle endpoint entity
   * @param x - Castle X position
   * @param y - Castle Y position
   * @param width - Castle width (default: 64)
   * @param height - Castle height (default: 64)
   * @param color - Castle color (default: gold)
   * @returns Castle entity
   */
  static createCastle(
    x: number,
    y: number,
    width: number = 64,
    height: number = 64,
    color: string = '#ffd700'
  ): Entity {
    const castle = new Entity();

    // Add position component
    castle.addComponent(new PositionComponent(x, y));

    // Add render component
    castle.addComponent(new RenderComponent(width, height, color, true, 2));

    return castle;
  }

  /**
   * Create a moving platform entity
   * @param x - Platform X position
   * @param y - Platform Y position
   * @param width - Platform width
   * @param height - Platform height
   * @param vx - Initial X velocity
   * @param vy - Initial Y velocity
   * @param color - Platform color (default: brown)
   * @returns Moving platform entity
   */
  static createMovingPlatform(
    x: number,
    y: number,
    width: number,
    height: number,
    vx: number = 0,
    vy: number = 0,
    color: string = '#8b4513'
  ): Entity {
    const platform = new Entity();

    // Add position component
    platform.addComponent(new PositionComponent(x, y));

    // Add velocity component for movement
    platform.addComponent(new VelocityComponent(vx, vy));

    // Add render component
    platform.addComponent(new RenderComponent(width, height, color, true, 0));

    return platform;
  }

  /**
   * Create a simple decorative entity
   * @param x - Entity X position
   * @param y - Entity Y position
   * @param width - Entity width
   * @param height - Entity height
   * @param color - Entity color
   * @param depth - Render depth (default: 0)
   * @returns Decorative entity
   */
  static createDecoration(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    depth: number = 0
  ): Entity {
    const decoration = new Entity();

    // Add position component
    decoration.addComponent(new PositionComponent(x, y));

    // Add render component only (no physics)
    decoration.addComponent(new RenderComponent(width, height, color, true, depth));

    return decoration;
  }

  /**
   * Create a text entity (for UI elements)
   * @param x - Text X position
   * @param y - Text Y position
   * @param text - Text content (stored in render component color for simplicity)
   * @param color - Text color
   * @returns Text entity
   */
  static createText(
    x: number,
    y: number,
    text: string,
    color: string = '#ffffff'
  ): Entity {
    const textEntity = new Entity();

    // Add position component
    textEntity.addComponent(new PositionComponent(x, y));

    // Store text in color field for simplicity (in real implementation, would use TextComponent)
    // text parameter stored for future use when TextComponent is implemented
    textEntity.addComponent(new RenderComponent(0, 0, color, true, 10));

    return textEntity;
  }
}
