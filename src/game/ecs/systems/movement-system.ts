import { System } from './system-interface';
import { Entity } from '../entities/entity';
import { PositionComponent } from '../components/position-component';
import { VelocityComponent } from '../components/velocity-component';

/**
 * MovementSystem - updates position based on velocity
 * Pure logic system with no state
 */
export class MovementSystem implements System {
  readonly type = 'movement';
  
  private entities: Entity[] = [];

  /**
   * Add an entity to this system
   * @param entity - Entity to add
   */
  addEntity(entity: Entity): void {
    // Only add entities that have both position and velocity components
    if (entity.hasComponent('position') && entity.hasComponent('velocity')) {
      this.entities.push(entity);
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
   * Update all entities in this system
   * @param deltaTime - Time elapsed since last frame in seconds
   */
  update(deltaTime: number): void {
    for (const entity of this.entities) {
      const positionComponent = entity.getComponent<PositionComponent>('position');
      const velocityComponent = entity.getComponent<VelocityComponent>('velocity');

      if (positionComponent && velocityComponent) {
        // Update position based on velocity and time
        positionComponent.x += velocityComponent.vx * deltaTime;
        positionComponent.y += velocityComponent.vy * deltaTime;
      }
    }
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
