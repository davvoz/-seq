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
  public drawLine(): void {

  }
  private costruisciLinea(): void {
    for (let i = 0; i < this.lunghezza; i++) {
      if (this.orientamento == 'VERTICALE') {
        this.squares.push(new Square(this.lato, this.getX(), this.getY() + i, this.getColor(), this.ctx, 0))
        this.squares[i].standUp();
      } else {

      }
    }
  }
}