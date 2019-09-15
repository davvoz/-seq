import { Shape } from './shape';
export class Square extends Shape {
  private dimensioneLato: number;
  constructor( lato: number , x: number, y: number,color:String,private ctx: CanvasRenderingContext2D) {
    super(x, y,color,ctx);
    this.dimensioneLato = lato;
  }
  public getDimensioneLato(): number {
    return this.dimensioneLato
  }
  public setDimensioneLato(dim: number) {
    this.dimensioneLato = dim;
  }
  draw(){
     this.ctx.fillRect(this.getDimensioneLato() * this.getX(), this.getDimensioneLato() * this.getY(), this.getDimensioneLato(), this.getDimensioneLato());
  }
}