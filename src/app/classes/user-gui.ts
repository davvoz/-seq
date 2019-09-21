import { Coordinates } from '../interfaces/interfaces';
import { Shape } from './shape';
export class UserGui extends Shape {
  par: Coordinates;
  collisions: number;
  color: String;
  ctx;
  constructor(x: number, y: number, ctx: CanvasRenderingContext2D, par: Coordinates, collisions: number, color: string) {
    super(x, y, color, ctx);
    this.par = par;
    this.collisions = collisions;
    this.color = color;
    this.ctx = ctx;
  }
  private getText() {
    return this.par
  }
  private setColor() {
  }
  private getCollision() {
    return this.collisions
  }
  public setCollisions(value: number) {
    this.collisions = value;
  }
  draw() {
 


  }
}