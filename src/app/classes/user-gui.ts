import { Coordinates } from '../interfaces/interfaces';
import { Shape } from './shape';
export class UserGui extends Shape{
  par: Coordinates;
  collisions:number;
  color:String;
  constructor( x: number, y: number, ctx: CanvasRenderingContext2D, par: Coordinates, collisions:number,color:string) {
    super(x, y, color, ctx);
    this.par = par;
    this.collisions = collisions;
    this.color = color;
  }
  private getText() {
    return this.par
  }
  private setColor(){
  }
  private getCollision(){
    return this.collisions
  }
  public setCollisions(value:number){
    this.collisions = value;
  }
  public draw() {
   
   
    
    this.ctx.font = "15px IMPACT";
    this.ctx.fillText('X = ' + this.getText().x, 230, 320);
    this.ctx.font = "15px IMPACT";
    this.ctx.fillText('Y = ' + this.getText().y, 290, 320);

    this.ctx.font = "15px IMPACT";
    this.ctx.fillText('Collision N° = ' + this.getCollision(), 0, 320);
     
    
  }
}