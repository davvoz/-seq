import { Square } from './square';
export class Cursor extends Square {
  
  
  draw() {
    this.ctx.fillStyle = 'rgb(' + this.getColor() + ')';
    // this.ctx.fillRect(this.getDimensioneLato() * this.getX(), this.getDimensioneLato() * this.getY(),
    //  this.getDimensioneLato(), this.getDimensioneLato());

    this.ctx.beginPath();
    this.ctx.arc(this.getDimensioneLato() * this.getX(), this.getDimensioneLato() * this.getY(), this.getDimensioneLato() / 2, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = 'green';
    //this.ctx.fill();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#003300';
    this.ctx.stroke();

  }
}