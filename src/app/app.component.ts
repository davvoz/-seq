import { Component, HostListener, ElementRef, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerService } from './services/timer.service';
import { SoundService } from './services/sound.service';
import { RadioBtn, Adsr } from './interfaces/interfaces';
import { Square } from './classes/square';
import { UserGui } from './classes/user-gui';
import { Cursor } from './classes/cursor';
import { LineOfSquares } from './classes/line-of-squares';
import { Coordinates, Collision } from './interfaces/interfaces';
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
    this.key = event.key;
  }
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
  arrBeats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  frequencies = [110.00, 116.54, 123.47, 130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185.00, 196.00, 207.65];
  w; h; cellwidth; cellheight;
  coord: Coordinates = { x: 0, y: 0 };
  @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvasGui', { static: false }) canvasGui: ElementRef<HTMLCanvasElement>;
  private ctxGui: CanvasRenderingContext2D;
  private ctx: CanvasRenderingContext2D;
  userGui: UserGui;

  persistenceColor = { counter: 10, color: '0,0,0' };
  enemies: Square[] = [];
  selectedValue = { name: 'collidi', cod: 0 };
  collisionsNumber = 0;

  borderCollider = false;
  myLine: LineOfSquares;
  constructor(public myTimer: TimerService, public mySound: SoundService, private ngZone: NgZone) {
    this.coord.x = 0;
    this.coord.y = 0;
    this.myTimer.speed = 180;

  }
  ngAfterViewInit() {
    this.ctxGui = this.canvasGui.nativeElement.getContext("2d");
    this.ctx = this.canvas.nativeElement.getContext("2d");
    this.myLine = new LineOfSquares(this.lato, -1, 0, '0,0,0', this.ctx, 100, 12, 'VERTICALE');
    this.myLine.standUp();
    this.populateEnemiesArray();
    this.standUpEnemies();
    this.userGui = new UserGui(0,0,this.ctxGui,{x:0,y:0},0,'0,0,0');
    this.userGui.draw();
    
    this.subscription = this.myTimer.trackStateItem$
      .subscribe(res => {
        if (this.isPlayed) {
          this.tick();
        }
      });


  }
  tick() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    
    this.userGui.draw();
    this.standUpEnemies();
    this.coord = { x: this.myLine.getX(), y: 0 };
    this.myLine.setColor('100,0,0');
    const col: Collision = this.collisionsArrayControl(this.myLine);
    if (this.myLine.getX() == 15) {
      this.myLine.setX(0);
      if (!col.esito) {
        this.mySound.playOscillator(this.enemies[col.indice].getTune());
      }
    } else {
      this.myLine.moveRight();
      if (this.enemies.length > 0) {
        if (!col.esito) {
          this.mySound.playOscillator(this.enemies[col.indice].getTune() + 50);
        }
      }
    }
  }

  private populateEnemiesArray(): void {
    for (let i = 0; i < 15; i++) {
      this.enemies.push(new Square(this.lato, i, 1, '100,100,100', this.ctx, 100))
    }

  }

  private standUpEnemies(): void {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].standUp();
    }
  }
  private collisionsArrayControl(square: Square): Collision {

    let count = 0;
    for (let i = 0; i < this.enemies.length; i++) {
      if (this.collision(square, this.enemies[i])) {
        square.setColor(this.randomColorString());

        return { esito: false, indice: i }
      }
      count = i;
    }
    return { esito: true, indice: count }
  }
  private manage(direction: String, sq: Square, index: number) {
    this.mySound.playOscillator(this.enemies[index].getTune() + this.getRandomInt(100, 0));
    switch (direction) {
      case 'UP': sq.moveUp(); break;
      case 'DOWN': sq.moveDown(); break;
      case 'LEFT': sq.moveLeft(); break;
      case 'RIGHT': sq.moveRight(); break;
    }
  }

  public start() {
    this.isPlayed = true;
    this.myTimer.play();
    // this.myLine = new LineOfSquares(20, 0, 0, '100,100,100', this.ctx, 100, 12, 'VERTICALE');
  }
  public stop() {
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

  public getMousePos(evt) {
    let rect = this.canvas.nativeElement.getBoundingClientRect();
    return {
      x: Math.floor((evt.clientX - rect.left) / this.lato),
      y: Math.floor((evt.clientY - rect.top) / this.lato)
    };
  }
  private randomColorString() {
    return this.getRandomInt(255, 0) + ',' + this.getRandomInt(255, 0) + ',' + this.getRandomInt(255, 0);
  }
  private getRandomInt(maxValue: number, minValue: number) {
    return Math.floor(Math.random() * (maxValue - 0)) + minValue; //Il max è escluso e il min è incluso
  }
  collision(player: Square, enemy: Square) {
    var distX = Math.abs(player.getX() - enemy.getX() - enemy.getDimensioneLato());
    var dx = distX - enemy.getDimensioneLato();
    return (dx == 0);
  }
  handleChange(evt) {
    let coo: Coordinates = this.getMousePos(evt);
    //this.enemies.push(new Square(this.lato, coo.x, coo.y - 1, '100,100,100', this.ctx, 100 * coo.y));
    this.enemies[coo.x].isStanding() ? this.enemies[coo.x].kill():this.enemies[coo.x].standUp();
    console.log(coo.x, coo.y);
  }

 
}
