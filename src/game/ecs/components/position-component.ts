import { Component } from './component-interface';

/**
 * PositionComponent - stores x, y coordinates
 * Flat component structure for performance
 */
export class PositionComponent implements Component {
  readonly type = 'position';
  
  /** X coordinate in game world */
  x: number = 0;
  
  /** Y coordinate in game world */
  y: number = 0;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * Set position coordinates
   * @param x - New x coordinate
   * @param y - New y coordinate
   */
  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  /**
   * Get position as coordinate object
   * @returns Object with x and y properties
   */
  getPosition(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }
}
