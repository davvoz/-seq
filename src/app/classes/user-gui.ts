import { Coordinates } from '../interfaces/interfaces';

export class UserGui {
  par: Coordinates;
  constructor(private ctx: CanvasRenderingContext2D, par: Coordinates) {
    this.par = par;
  }
  private getText() {
    return this.par
  }
  public draw() {
   
   this.ctx.strokeStyle = "green";
    
    this.ctx.font = "20px IMPACT";
    this.ctx.fillText('X = ' + this.getText().x, 250, 290);
    this.ctx.font = "20px IMPACT";
    this.ctx.fillText('Y = ' + this.getText().y, 250, 270);
     
     
  }
}