import { Coordinates } from '../interfaces/interfaces';
import { Shape } from './shape';
export class UserGui {
  par: Coordinates;
  collisions: number;
  ctxGui:CanvasRenderingContext2D;
  lato;
  constructor(x: number, y: number, ctxGui: CanvasRenderingContext2D, par: Coordinates, collisions: number, color: string,lato:number) {
    this.par = par;
    this.collisions = collisions;
    this.ctxGui = ctxGui;
    this.lato = lato;
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
    for (let y = 0; y < this.ctxGui.canvas.height; y = y + this.lato) {
      for (let x = 0; x < this.ctxGui.canvas.width; x = x + this.lato) {
        if (x % 8 == 0) {
          this.ctxGui.beginPath();
          this.ctxGui.moveTo(x, 0);
          this.ctxGui.strokeStyle = "black";
          this.ctxGui.lineTo(x, this.lato);
          this.ctxGui.shadowBlur = 0;
          this.ctxGui.stroke();
        }
        this.ctxGui.beginPath();
        if (y % 8) {
          this.ctxGui.fillStyle = "rgb(32,32,32)";
        } else {
          this.ctxGui.fillStyle = "rgb(40,40,40)";
        }
        this.ctxGui.strokeStyle = "rgb(24,24,24)";
        this.ctxGui.rect(x, y, this.lato, this.lato);
        this.ctxGui.fill()
        this.ctxGui.stroke();
      }
    }
  }
  
}