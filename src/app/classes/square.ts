import { Shape } from './shape';
export class Square extends Shape {
  private dimensioneLato: number;
  constructor( lato: number , x: number, y: number) {
    super(x, y);
    this.dimensioneLato = lato;
  }
  public getDimensioneLato(): number {
    return this.dimensioneLato
  }
  public setDimensioneLato(dim: number) {
    this.dimensioneLato = dim;
  }
}