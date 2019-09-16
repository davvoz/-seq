import { Component, HostListener, ElementRef, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerService } from './services/timer.service';
import { SoundService } from './services/sound.service';
import { RadioBtn, Adsr } from './interfaces/interfaces';
import { Square } from './classes/square';
import { UserGui } from './classes/user-gui';
import { Coordinates } from './interfaces/interfaces';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)'
  }
})
export class AppComponent implements AfterViewInit {

  public key;
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event.key);
    this.key = event.key;
  }

  precedent: Square;

  radioButtons: Array<RadioBtn> = [];
  isPlayed = false;
  subscription: Subscription;
  frequency = 0;
  requestId;
  gain = 0;
  width = 300;
  lato = 20;
  public attack = 0;
  public decay = 0;
  public sustain = 0;
  public relase = 0;
  public sustainVal = 0;
  count = 0;
  matrix = [[]];
  fre = [];
  squares: Square[] = [];
  arrBeats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  frequencies = [110.00, 116.54, 123.47, 130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185.00, 196.00, 207.65];
  w; h; cellwidth; cellheight;
  coord: Coordinates = { x: 0, y: 0 };
  @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas', { static: false }) canvasGui: ElementRef<HTMLCanvasElement>;
  private ctxGui: CanvasRenderingContext2D;
  private ctx: CanvasRenderingContext2D;
  userGui: UserGui;
  block: Square = new Square(20, 10, 6, this.randomColorString(), this.ctx);
  collisionsNumber = 0;
  constructor(public myTimer: TimerService, public mySound: SoundService, private ngZone: NgZone) {
    this.coord.x = 0;
    this.coord.y = 0;

    this.subscription = this.myTimer.trackStateItem$
      .subscribe(res => {


        if (this.isPlayed) {
        }

      });
  }
  ngAfterViewInit() {
    this.ctxGui = this.canvasGui.nativeElement.getContext("2d");
    this.ctx = this.canvas.nativeElement.getContext("2d");

    this.ngZone.runOutsideAngular(() => this.tick());
    setInterval(() => {
      this.tick();
    }, 200);


  }
  tick() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
   // this.block = new Square(20, this.getRandomInt(14), this.getRandomInt(14), this.randomColorString(), this.ctx);

     this.block = new Square(20, 10, 10, '0,0,0', this.ctx);

    //this.block.setColor('200,10,160');
    this.block.standUp();
    this.squares.forEach((square: Square) => {
      this.coord = { x: square.getX(), y: square.getY() };
      this.userGui = new UserGui(this.ctxGui, this.coord,this.collisionsNumber);
      this.userGui.draw();
      square.setColor('0,0,0');

      switch (this.key) {
        case 'w':
          if (!this.collision(square, this.block)) {
            if (square.getY() > 0) { square.moveUp(); } else { square.standUp() }
          } else {
            this.collisionsNumber++;
            //square.standUp()
          }
          break;
        case 'a':
          if (!this.collision(square, this.block)) {
            if (square.getX() > 0) { square.moveLeft(); } else { square.standUp() };
          } else {
            // square.standUp()
            this.collisionsNumber++;

          }
          break;
        case 's':
          if (!this.collision(square, this.block)) {
            if (square.getY() < 14) { square.moveDown();; } else { square.standUp() }
          } else {
            this.collisionsNumber++;

            //square.standUp()
          }
          break;
        case 'd':
          if (!this.collision(square, this.block)) {
            if (square.getX() < 14) { square.moveRight(); } else { square.standUp() };
          } else {
            this.collisionsNumber++;

            //square.standUp()
          }
          break;
        default: square.standUp();
          break;
      }

    });
    this.requestId = requestAnimationFrame(() => { this.tick; this.count++; });
    // 
  }
  public start() {
    this.squares.pop();
    const square = new Square(this.lato, 0, 0, '100,100,20', this.ctx);
    this.squares = this.squares.concat(square);

  }
  public stop() {
    //cancelAnimationFrame(this.requestId);
    this.isPlayed = false;
    this.myTimer.stop()
  }
  public pause() {
    this.isPlayed = false;
    this.myTimer.pause()
  }

  getColor(number) {
    if (this.myTimer.steps + 1 == number) {
      return '#199'
    } else {
      return '#119'
    }
  }
  play(): void {
    const squareModel = new Square(10, 0, 0, this.randomColorString(), this.ctx);;
    this.squares = this.squares.concat(squareModel);
  }
  handleChange(event) {

  }

  private getMousePos(evt) {
    let rect = this.canvas.nativeElement.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
  private randomColorString() {
    return this.getRandomInt(255) + ',' + this.getRandomInt(255) + ',' + this.getRandomInt(255);
  }
  private getRandomInt(maxValue: number) {
    return Math.floor(Math.random() * (maxValue - 0)) + 0; //Il max è escluso e il min è incluso
  }
  collision(player: Square, enemy: Square) {
    var distX = Math.abs(player.getX() - enemy.getX() - enemy.getDimensioneLato());
    var distY = Math.abs(player.getY() - enemy.getY() - enemy.getDimensioneLato());



    var dx = distX - enemy.getDimensioneLato();
    var dy = distY - enemy.getDimensioneLato();
    console.log(dx);
    console.log(dy);
    return (dx == 0 && dy == 0);
  }

}
