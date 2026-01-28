import { Component } from '../components/component-interface';

/**
 * Base Entity class for ECS architecture
 * Entities are containers for components with unique IDs
 */
export class Entity {
  private static nextId: number = 0;
  private readonly id: number;
  private components: Map<string, Component> = new Map();

  constructor() {
    this.id = Entity.nextId++;
  }

  /**
   * Get the unique entity ID
   */
  getId(): number {
    return this.id;
  }

  /**
   * Add a component to this entity
   * @param component - Component instance to add
   */
  addComponent(component: Component): void {
    this.components.set(component.type, component);
  }

  /**
   * Get a component by type
   * @param componentType - Component type string
   * @returns Component instance or undefined if not found
   */
  getComponent<T extends Component>(componentType: string): T | undefined {
    return this.components.get(componentType) as T;
  }

  /**
   * Remove a component from this entity
   * @param componentType - Component type string to remove
   * @returns True if component was removed, false if not found
   */
  removeComponent(componentType: string): boolean {
    return this.components.delete(componentType);
  }

  /**
   * Check if entity has a specific component
   * @param componentType - Component type string to check
   * @returns True if component exists, false otherwise
   */
  hasComponent(componentType: string): boolean {
    return this.components.has(componentType);
  }

  /**
   * Get all component types this entity has
   * @returns Array of component type strings
   */
  getComponentTypes(): string[] {
    return Array.from(this.components.keys());
  }

  /**
   * Remove all components from this entity
   */
  clearComponents(): void {
    this.components.clear();
  }
}
