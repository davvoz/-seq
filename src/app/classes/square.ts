import { Shape } from './shape';
export class Square extends Shape {
   dimensioneLato: number;
   tune: number;
   ctx;
  constructor(lato: number, x: number, y: number, color: String,  ctx: CanvasRenderingContext2D, tune: number) {
    super(x, y, color, ctx);
    this.dimensioneLato = lato;
    this.tune = tune;
    this.ctx = ctx;
  }
  public getDimensioneLato(): number {
    return this.dimensioneLato
  }
  public setDimensioneLato(dim: number) {
    this.dimensioneLato = dim;
  }
  public setTune(tune: number) {
    this.tune = tune;
  }
  public getTune(): number {
    return this.tune
  }
  draw() {
    this.ctx.fillStyle = 'rgb(' + this.getColor() + ')';
   // this.ctx.fillRect(this.getDimensioneLato() * this.getX(), this.getDimensioneLato() * this.getY(),
    //  this.getDimensioneLato(), this.getDimensioneLato());

      this.ctx.beginPath();
      this.ctx.arc(this.getDimensioneLato() *this.getX(),this.getDimensioneLato() * this.getY(), this.getDimensioneLato() /2, 0, 2 * Math.PI, false);
      this.ctx.fillStyle = 'green';
      //this.ctx.fill();
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = '#003300';
      this.ctx.stroke();

  }
}