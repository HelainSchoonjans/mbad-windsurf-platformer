import { Component } from './component-interface';

/**
 * VelocityComponent - stores vx, vy velocity values
 * Flat component structure for performance
 */
export class VelocityComponent implements Component {
  readonly type = 'velocity';
  
  /** Velocity in X direction (pixels per second) */
  vx: number = 0;
  
  /** Velocity in Y direction (pixels per second) */
  vy: number = 0;

  constructor(vx: number = 0, vy: number = 0) {
    this.vx = vx;
    this.vy = vy;
  }

  /**
   * Set velocity values
   * @param vx - New X velocity
   * @param vy - New Y velocity
   */
  setVelocity(vx: number, vy: number): void {
    this.vx = vx;
    this.vy = vy;
  }

  /**
   * Get velocity as object
   * @returns Object with vx and vy properties
   */
  getVelocity(): { vx: number; vy: number } {
    return { vx: this.vx, vy: this.vy };
  }

  /**
   * Apply acceleration to velocity
   * @param ax - Acceleration in X direction
   * @param ay - Acceleration in Y direction
   * @param deltaTime - Time elapsed since last frame
   */
  applyAcceleration(ax: number, ay: number, deltaTime: number): void {
    this.vx += ax * deltaTime;
    this.vy += ay * deltaTime;
  }
}
