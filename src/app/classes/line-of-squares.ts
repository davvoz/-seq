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
    this.costruisciLinea();
  }
  public drawLine(): void {
    for (let i = 0; i < this.lunghezza; i++) {
this.ctx.fillRect(this.getDimensioneLato() * this.getX(), this.getDimensioneLato() * this.getY(),
      this.getDimensioneLato(), this.getDimensioneLato());
    }
  }
  private costruisciLinea(): void {
    for (let i = 0; i < this.lunghezza; i++) {
     
      if (this.orientamento == 'VERTICALE') {
         console.log(this.squares);
        this.squares.push(new Square(this.lato, this.getX(), this.getY() +2, this.getColor(), this.ctx, 0))

      } else {

      }
    }
    this.drawLine()
  }
}