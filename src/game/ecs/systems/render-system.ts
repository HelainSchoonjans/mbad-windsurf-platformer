import { System } from './system-interface';
import { Entity } from '../entities/entity';
import { PositionComponent } from '../components/position-component';
import { RenderComponent } from '../components/render-component';

/**
 * RenderSystem - handles visual rendering of entities
 * Pure logic system with no state
 */
export class RenderSystem implements System {
  readonly type = 'render';
  
  private entities: Entity[] = [];
  private graphicsContext: Phaser.GameObjects.Graphics | null = null;

  /**
   * Set the graphics context for rendering
   * @param graphics - Phaser Graphics object for rendering
   */
  setGraphicsContext(graphics: Phaser.GameObjects.Graphics): void {
    this.graphicsContext = graphics;
  }

  /**
   * Add an entity to this system
   * @param entity - Entity to add
   */
  addEntity(entity: Entity): void {
    // Only add entities that have both position and render components
    if (entity.hasComponent('position') && entity.hasComponent('render')) {
      this.entities.push(entity);
      // Sort by depth to ensure proper rendering order
      this.entities.sort((a, b) => {
        const aRender = a.getComponent<RenderComponent>('render');
        const bRender = b.getComponent<RenderComponent>('render');
        return (aRender?.depth || 0) - (bRender?.depth || 0);
      });
    }
  }

  /**
   * Remove an entity from this system
   * @param entity - Entity to remove
   */
  removeEntity(entity: Entity): void {
    const index = this.entities.indexOf(entity);
    if (index > -1) {
      this.entities.splice(index, 1);
    }
  }

  /**
   * Update all entities in this system (renders them)
   * @param deltaTime - Time elapsed since last frame in seconds (not used in render system)
   */
  update(deltaTime: number): void {
    // deltaTime not used in render system as rendering is immediate
    if (!this.graphicsContext) {
      return;
    }

    // Clear previous frame
    this.graphicsContext.clear();

    // Render each entity
    for (const entity of this.entities) {
      const positionComponent = entity.getComponent<PositionComponent>('position');
      const renderComponent = entity.getComponent<RenderComponent>('render');

      if (positionComponent && renderComponent && renderComponent.visible) {
        this.renderEntity(positionComponent, renderComponent);
      }
    }
  }

  /**
   * Render a single entity as a rectangle
   * @param position - Position component
   * @param render - Render component
   */
  private renderEntity(
    position: PositionComponent,
    render: RenderComponent
  ): void {
    if (!this.graphicsContext) {
      return;
    }

    // Set fill color
    this.graphicsContext.fillStyle(parseInt(render.color.replace('#', '0x'), 16));

    // Draw rectangle centered at position
    const x = position.x - render.width / 2;
    const y = position.y - render.height / 2;

    this.graphicsContext.fillRect(x, y, render.width, render.height);
  }

  /**
   * Get all entities in this system
   * @returns Array of entities
   */
  getEntities(): Entity[] {
    return [...this.entities];
  }

  /**
   * Clear all entities from this system
   */
  clearEntities(): void {
    this.entities = [];
  }
}
