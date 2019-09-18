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
  @ViewChild('canvasGui', { static: false }) canvasGui: ElementRef<HTMLCanvasElement>;
  private ctxGui: CanvasRenderingContext2D;
  private ctx: CanvasRenderingContext2D;
  userGui: UserGui;
  block: Square = new Square(20, 10, 6, this.randomColorString(), this.ctx);
  block2: Square = new Square(20, 0, 6, this.randomColorString(), this.ctx);
  block3: Square = new Square(20, 6, 6, this.randomColorString(), this.ctx);
  block4: Square = new Square(20, 6, 6, this.randomColorString(), this.ctx);
  collisionsNumber = 0;
  l1 = this.getRandomInt(14);
  l2 = this.getRandomInt(14);
  l3 = this.getRandomInt(14);
  l4 = this.getRandomInt(14);

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
    }, 100);


  }
  tick() {

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctxGui.clearRect(0, 0, this.ctxGui.canvas.width, this.ctxGui.canvas.height);

    this.block = new Square(this.lato, 10, 10, '110,0,0', this.ctx);
    this.block2 = new Square(this.lato, 10, 3, '110,0,0', this.ctx);
    this.block3 = new Square(this.lato, 10, 5, '110,0,0', this.ctx);
    this.block4 = new Square(this.lato, 10, 7, '110,0,0', this.ctx);

    //switch (this.getRandomInt(3)) {
    //case 0: this.block.moveUp(); break;
    //case 1: this.block.moveLeft(); break;
    //case 2: this.block.moveDown(); break;
    // case 3: this.block.moveRight();; break;
    // }
    this.userGui = new UserGui(this.ctxGui, this.coord, this.collisionsNumber);
    this.userGui.draw();
    this.block.setColor('100,10,160');
    this.block3.setColor(this.randomColorString());
    this.block.standUp();
    this.block2.standUp();
    this.block3.standUp();
    this.block4.standUp();
    this.squares.forEach((square: Square) => {
      this.coord = { x: square.getX(), y: square.getY() };

      square.setColor('0,0,0');

      switch (this.key) {
        case 'w':
          if (!this.collision(square, this.block) && !this.collision(square, this.block2) && !this.collision(square, this.block3)&& !this.collision(square, this.block4)) {
            if (square.getY() > 0) { square.moveUp(); } else {if(square.getY()==14){ square.setY(0)}else {square.standUp() }}
          } else {
            this.collisionsNumber++;
            this.mySound.playOscillator(this.getRandomInt(1330));
            square.moveUp();
            //square.standUp()
            //this.squares.pop();
          }
          break;
        case 'a':
          if (!this.collision(square, this.block) && !this.collision(square, this.block2) && !this.collision(square, this.block3)&& !this.collision(square, this.block4)) {
            if (square.getX() > 0) { square.moveLeft(); } else { square.standUp() };
          } else {
            //square.standUp()
            this.mySound.playOscillator(this.getRandomInt(1330));
            this.collisionsNumber++;
            square.moveLeft();
            //this.squares.pop();
          }
          break;
        case 's':
          if (!this.collision(square, this.block) && !this.collision(square, this.block2) && !this.collision(square, this.block3)&& !this.collision(square, this.block4)) {
            if (square.getY() < 14) { square.moveDown() } else {if(square.getY()==14){ square.setY(0)}else {square.standUp() }}
          } else {
            this.collisionsNumber++;
            //this.squares.pop();
            this.mySound.playOscillator(this.getRandomInt(1330));
            // square.standUp()
            square.moveDown();
          }
          break;
        case 'd':
          if (!this.collision(square, this.block) && !this.collision(square, this.block2) && !this.collision(square, this.block3)&& !this.collision(square, this.block4)) {
            if (square.getX() < 14) { square.moveRight(); } else { square.standUp() };
          } else {
            this.collisionsNumber++;
            // this.squares.pop();
            square.moveRight();
            this.mySound.playOscillator(this.getRandomInt(1330));
            //square.standUp()
          }
          break;
        default: square.standUp();
          break;
      }

    });

    this.requestId = requestAnimationFrame(() => { this.tick });

  }
  public start() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctxGui.clearRect(0, 0, this.ctxGui.canvas.width, this.ctxGui.canvas.height);
    this.block = new Square(this.lato, this.getRandomInt(14), this.getRandomInt(14), '110,0,0', this.ctx);
    this.block2 = new Square(this.lato, this.getRandomInt(14), this.getRandomInt(14), '110,0,0', this.ctx);
    //this.squares.pop();
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

    return (dx == 0 && dy == 0);
  }

}
