import {  Drowable } from '../interfaces/interfaces';
export  class Shape implements Drowable {
  private posX: number;
  private posY: number;
  private color: String;
  constructor(x: number, y: number, color: String,  ctx: CanvasRenderingContext2D) {
    this.posX = x;
    this.posY = y;
    this.color = color;
  }

  public getX(): number {
    return this.posX
  }
  public getY(): number {
    return this.posY
  }
  public getColor(): String {
    return this.color
  }
  public setColor(val: String) {
    this.color = val;
  }
  public setX(val: number) {
    this.posX = val;
  }
  public setY(val: number) {
    this.posY = val;
  }
  moveRight() {
    this.posX++;
    this.draw();
  }
  moveLeft() {
    this.posX--;
    this.draw();
  }
  moveDown() {
    this.posY++;
    this.draw();
  }
  moveUp() {
    this.posY--;
    this.draw();
  }
  standUp() {
    this.posX = this.getX();
    this.posY = this.getY();
    this.draw();
  }
  draw() { }
 
}