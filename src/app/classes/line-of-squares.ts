import { Square } from './square';
import { Orientation } from '../interfaces/interfaces';
export class LineOfSquares extends Square {
  lunghezza: number;
  orientamento: String;
  squares: Square[];
  lato: number;
  constructor(lato: number, x: number, y: number, color: String, ctx: CanvasRenderingContext2D, tune: number, lunghezza: number, orientamento: String) {
    super(lato, x, y, color, ctx, tune);
    this.lunghezza = lunghezza;
    this.orientamento = orientamento;
    this.lato = lato;
    this.orientamento = orientamento
    this.squares = [];
  }
  draw() {
     for (let i = 0; i < this.lunghezza; i++) {
    this.ctx.strokeStyle = 'red';
    this.ctx.fillStyle = 'rgb(' + this.getColor() + ')';
    this.ctx.fillRect(this.getDimensioneLato() * this.getX(), this.getDimensioneLato() * this.getY() + this.getDimensioneLato() *i,
      2, this.getDimensioneLato());
     }


    //clear background
    // draw font in red


    //this.ctx.beginPath();
    //this.ctx.arc(this.getDimensioneLato() *this.getX(),this.getDimensioneLato() * this.getY(), this.getDimensioneLato() /2, 0, 2 * Math.PI, false);
    //this.ctx.fillStyle = this.getColor();
    //this.ctx.fill();
    //this.ctx.lineWidth = 1;
    //this.ctx.strokeStyle = 'red';
    //this.ctx.stroke();

  }
  
}