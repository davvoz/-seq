import { Position } from '../interfaces/interfaces';
export class Shape {
  private posX: number;
  private posY: number;
  constructor(x:number,y:number) {
    this.posX=x;
    this.posY=y;
   }

  public getX(): number {
    return this.posX
  }
  public getY(): number {
    return this.posY
  }
  public setX(val: number) {
    this.posX = val;
  }
  public setY(val: number) {
    this.posY = val;
  }
}