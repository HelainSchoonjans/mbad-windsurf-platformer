import { Entity } from './entities/entity';
import { System } from './systems/system-interface';
import { Component } from './components/component-interface';

/**
 * ECS Manager - coordinates entity-component-system interactions
 * Central hub for all ECS operations
 */
export class ECSManager {
  private entities: Map<number, Entity> = new Map();
  private systems: Map<string, System> = new Map();
  private componentRegistry: Map<string, Set<number>> = new Map();

  /**
   * Create a new entity and add it to the manager
   * @returns Created entity
   */
  createEntity(): Entity {
    const entity = new Entity();
    this.entities.set(entity.getId(), entity);
    return entity;
  }

  /**
   * Add an existing entity to the manager
   * @param entity - Entity to add
   */
  addEntity(entity: Entity): void {
    this.entities.set(entity.getId(), entity);
  }

  /**
   * Remove an entity from the manager
   * @param entityId - ID of entity to remove
   * @returns True if entity was removed, false if not found
   */
  removeEntity(entityId: number): boolean {
    const entity = this.entities.get(entityId);
    if (entity) {
      // Remove entity from all component registries
      for (const componentType of entity.getComponentTypes()) {
        const entitySet = this.componentRegistry.get(componentType);
        if (entitySet) {
          entitySet.delete(entityId);
        }
      }

      // Remove entity from all systems
      for (const system of this.systems.values()) {
        if ('removeEntity' in system && typeof system.removeEntity === 'function') {
          system.removeEntity(entity);
        }
      }

      // Clear entity components and remove from entities map
      entity.clearComponents();
      this.entities.delete(entityId);
      return true;
    }
    return false;
  }

  /**
   * Get an entity by ID
   * @param entityId - ID of entity to get
   * @returns Entity or undefined if not found
   */
  getEntity(entityId: number): Entity | undefined {
    return this.entities.get(entityId);
  }

  /**
   * Get all entities
   * @returns Array of all entities
   */
  getAllEntities(): Entity[] {
    return Array.from(this.entities.values());
  }

  /**
   * Add a component to an entity and update registries
   * @param entityId - ID of entity
   * @param component - Component to add
   */
  addComponent(entityId: number, component: Component): void {
    const entity = this.entities.get(entityId);
    if (entity) {
      entity.addComponent(component);
      
      // Update component registry
      if (!this.componentRegistry.has(component.type)) {
        this.componentRegistry.set(component.type, new Set());
      }
      this.componentRegistry.get(component.type)!.add(entityId);

      // Notify systems that might be interested in this component
      this.notifySystemsOfComponentChange(entity, component.type, 'added');
    }
  }

  /**
   * Remove a component from an entity and update registries
   * @param entityId - ID of entity
   * @param componentType - Type of component to remove
   * @returns True if component was removed, false if not found
   */
  removeComponent(entityId: number, componentType: string): boolean {
    const entity = this.entities.get(entityId);
    if (entity) {
      const removed = entity.removeComponent(componentType);
      
      if (removed) {
        // Update component registry
        const entitySet = this.componentRegistry.get(componentType);
        if (entitySet) {
          entitySet.delete(entityId);
        }

        // Notify systems that might be interested in this component
        this.notifySystemsOfComponentChange(entity, componentType, 'removed');
      }
      
      return removed;
    }
    return false;
  }

  /**
   * Get a component from an entity
   * @param entityId - ID of entity
   * @param componentType - Type of component to get
   * @returns Component or undefined if not found
   */
  getComponent<T extends Component>(entityId: number, componentType: string): T | undefined {
    const entity = this.entities.get(entityId);
    return entity ? entity.getComponent<T>(componentType) : undefined;
  }

  /**
   * Register a system with the ECS manager
   * @param system - System to register
   */
  registerSystem(system: System): void {
    this.systems.set(system.type, system);
  }

  /**
   * Unregister a system from the ECS manager
   * @param systemType - Type of system to unregister
   * @returns True if system was removed, false if not found
   */
  unregisterSystem(systemType: string): boolean {
    const system = this.systems.get(systemType);
    if (system) {
      // Clear entities from system
      if ('clearEntities' in system && typeof system.clearEntities === 'function') {
        system.clearEntities();
      }
      return this.systems.delete(systemType);
    }
    return false;
  }

  /**
   * Get a system by type
   * @param systemType - Type of system to get
   * @returns System or undefined if not found
   */
  getSystem(systemType: string): System | undefined {
    return this.systems.get(systemType);
  }

  /**
   * Get all entities that have a specific component type
   * @param componentType - Component type to query for
   * @returns Array of entities with the specified component
   */
  getEntitiesWithComponent(componentType: string): Entity[] {
    const entityIds = this.componentRegistry.get(componentType);
    if (!entityIds) {
      return [];
    }

    const entities: Entity[] = [];
    for (const entityId of entityIds) {
      const entity = this.entities.get(entityId);
      if (entity) {
        entities.push(entity);
      }
    }
    return entities;
  }

  /**
   * Update all systems (called each frame)
   * @param deltaTime - Time elapsed since last frame in seconds
   */
  update(deltaTime: number): void {
    for (const system of this.systems.values()) {
      system.update(deltaTime);
    }
  }

  /**
   * Notify systems of component changes
   * @param entity - Entity that changed
   * @param componentType - Type of component that changed
   * @param changeType - Type of change ('added' or 'removed')
   */
  private notifySystemsOfComponentChange(
    entity: Entity,
    componentType: string,
    changeType: 'added' | 'removed'
  ): void {
    // componentType is used for future filtering of systems based on component requirements
    for (const system of this.systems.values()) {
      if ('addEntity' in system && typeof system.addEntity === 'function' && changeType === 'added') {
        system.addEntity(entity);
      } else if ('removeEntity' in system && typeof system.removeEntity === 'function' && changeType === 'removed') {
        system.removeEntity(entity);
      }
    }
  }

  /**
   * Clear all entities, components, and systems
   */
  clear(): void {
    // Clear all entities
    for (const entity of this.entities.values()) {
      entity.clearComponents();
    }
    this.entities.clear();

    // Clear all systems
    for (const system of this.systems.values()) {
      if ('clearEntities' in system && typeof system.clearEntities === 'function') {
        system.clearEntities();
      }
    }

    // Clear registries
    this.componentRegistry.clear();
  }

  /**
   * Get statistics about the ECS state
   * @returns Object with entity, component, and system counts
   */
  getStats(): {
    entityCount: number;
    componentCount: number;
    systemCount: number;
    componentTypes: string[];
    systemTypes: string[];
  } {
    let componentCount = 0;
    for (const entity of this.entities.values()) {
      componentCount += entity.getComponentTypes().length;
    }

    return {
      entityCount: this.entities.size,
      componentCount,
      systemCount: this.systems.size,
      componentTypes: Array.from(this.componentRegistry.keys()),
      systemTypes: Array.from(this.systems.keys())
    };
  }
}
