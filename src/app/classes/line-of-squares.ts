import { Square } from './square';
import { Orientation } from '../interfaces/interfaces';
export class LineOfSquares {
  lunghezza: number;
  orientamento: Orientation;
  squares: Square[];
  lato:number;
  constructor(lunghezza: number, orientamento: Orientation,lato:number) {
    this.lunghezza = lunghezza;
    this.orientamento = orientamento;
    this.lato = lato;
  }
  private costruisciLinea(): void {
    for (let i = 0; i < this.lunghezza; i++) {
      if(this.orientamento == 'VERTICAL'){
      }
    }
  }
}