/**
 * Base interface for all ECS components
 * Components are pure data containers with no logic
 */
export interface Component {
  /** Unique component type identifier */
  readonly type: string;
}
