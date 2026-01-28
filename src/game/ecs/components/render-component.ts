import { Component } from './component-interface';

/**
 * RenderComponent - stores visual properties for rendering
 * Flat component structure for performance
 */
export class RenderComponent implements Component {
  readonly type = 'render';
  
  /** Width of the rendered object */
  width: number = 32;
  
  /** Height of the rendered object */
  height: number = 32;
  
  /** Color for polygon rendering (hex string) */
  color: string = '#ffffff';
  
  /** Whether the object should be rendered */
  visible: boolean = true;
  
  /** Render layer depth (higher = rendered on top) */
  depth: number = 0;

  constructor(
    width: number = 32,
    height: number = 32,
    color: string = '#ffffff',
    visible: boolean = true,
    depth: number = 0
  ) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.visible = visible;
    this.depth = depth;
  }

  /**
   * Set render dimensions
   * @param width - New width
   * @param height - New height
   */
  setDimensions(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  /**
   * Set render color
   * @param color - New color (hex string)
   */
  setColor(color: string): void {
    this.color = color;
  }

  /**
   * Set visibility
   * @param visible - Whether object should be rendered
   */
  setVisible(visible: boolean): void {
    this.visible = visible;
  }

  /**
   * Set render depth
   * @param depth - New depth value
   */
  setDepth(depth: number): void {
    this.depth = depth;
  }

  /**
   * Get all render properties
   * @returns Object with all render properties
   */
  getRenderProperties(): {
    width: number;
    height: number;
    color: string;
    visible: boolean;
    depth: number;
  } {
    return {
      width: this.width,
      height: this.height,
      color: this.color,
      visible: this.visible,
      depth: this.depth
    };
  }
}
