/**
 * Base interface for all ECS systems
 * Systems are pure logic processors that operate on components
 */
export interface System {
  /** Unique system type identifier */
  readonly type: string;
  
  /**
   * Update method called each frame
   * @param deltaTime - Time elapsed since last frame in seconds
   */
  update(deltaTime: number): void;
}
