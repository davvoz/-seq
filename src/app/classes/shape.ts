import { Position } from '../interfaces/interfaces';
export class Shape {
  private posX: number;
  private posY: number;
  private color:String;
  constructor(x:number,y:number,color:String) {
    this.posX=x;
    this.posY=y;
    this.color = color;
   }

  public getX(): number {
    return this.posX
  }
  public getY(): number {
    return this.posY
  }
  public getColor(): String {
    return this.color
  }
  public setColor(val: String) {
    this.color = val;
  }
  public setX(val: number) {
    this.posX = val;
  }
  public setY(val: number) {
    this.posY = val;
  }
 
}