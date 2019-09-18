import { Coordinates } from '../interfaces/interfaces';

export class UserGui {
  par: Coordinates;
  collisions:number;
  constructor(private ctx: CanvasRenderingContext2D, par: Coordinates, collisions:number) {
    this.par = par;
    this.collisions = collisions;
  }
  private getText() {
    return this.par
  }
  private getCollision(){
    return this.collisions
  }
  public setCollisions(value:number){
    this.collisions = value;
  }
  public draw() {
   
   this.ctx.strokeStyle = "green";
    
    this.ctx.font = "20px IMPACT";
    this.ctx.fillText('X = ' + this.getText().x, 250, 300);
    this.ctx.font = "20px IMPACT";
    this.ctx.fillText('Y = ' + this.getText().y, 250, 270);

    this.ctx.font = "20px IMPACT";
    this.ctx.fillText('Collision N° = ' + this.getCollision(), 0, 270);
     
     
  }
}