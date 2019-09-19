import { Component, HostListener, ElementRef, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerService } from './services/timer.service';
import { SoundService } from './services/sound.service';
import { RadioBtn, Adsr } from './interfaces/interfaces';
import { Square } from './classes/square';
import { UserGui } from './classes/user-gui';
import { Cursor } from './classes/cursor';
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
  squares: Cursor[] = [];
  arrBeats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  frequencies = [110.00, 116.54, 123.47, 130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185.00, 196.00, 207.65];
  w; h; cellwidth; cellheight;
  coord: Coordinates = { x: 0, y: 0 };
  @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvasGui', { static: false }) canvasGui: ElementRef<HTMLCanvasElement>;
  private ctxGui: CanvasRenderingContext2D;
  private ctx: CanvasRenderingContext2D;
  userGui: UserGui;
  block: Square = new Square(20, 10, 6, this.randomColorString(), this.ctx, 100);
  block2: Square = new Square(20, 0, 6, this.randomColorString(), this.ctx, 100);
  block3: Square = new Square(20, 6, 6, this.randomColorString(), this.ctx, 100);
  block4: Square = new Square(20, 6, 6, this.randomColorString(), this.ctx, 100);
  block5: Square = new Square(20, 6, 6, this.randomColorString(), this.ctx, 100);
  persistenceColor = { counter: 10, color: '0,0,0' };
  enemies: Square[] = [this.block, this.block2, this.block3, this.block4, this.block5];

  collisionsNumber = 0;
  l1 = this.getRandomInt(16, 0);
  l2 = this.getRandomInt(16, 0);
  l3 = this.getRandomInt(16, 0);
  l4 = this.getRandomInt(16, 0);

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
    this.ctxGui.clearRect(0, 0, this.ctxGui.canvas.width, this.ctxGui.canvas.height);

    this.enemies = [

    ];
    if (this.persistenceColor.counter > 5) {
      this.persistenceColor.color = '100,100,200';
      this.persistenceColor.counter--;
    } else if(this.persistenceColor.counter > 0){
     this.persistenceColor.color = '50,100,200';
      this.persistenceColor.counter--;
    }else{
      
      this.persistenceColor.counter = 10;
    }
    let rand = this.getRandomInt(255, 50);
    this.enemies = [
      new Square(this.lato, 10, 0, '100,0,0', this.ctx, 58.27),
      new Square(this.lato, 10, 3, '100,0,0', this.ctx, 61.74),
      new Square(this.lato, 10, 5, '100,0,0', this.ctx, 65.41),
      new Square(this.lato, 10, 7, '100,0,0', this.ctx, 69.30),
      new Square(this.lato, 10, 9, '100,0,0', this.ctx, rand),
      new Square(this.lato, 10, 11, this.persistenceColor.color, this.ctx, 77.78),
      new Square(this.lato, 10, 13, this.persistenceColor.color, this.ctx, 82.41),
      new Square(this.lato, 10, 15, '100,0,0', this.ctx, 87.31),
      new Square(this.lato, 10, 16, '100,0,0', this.ctx, 311.13),
      new Square(this.lato, 4, 1, '100,0,0', this.ctx, 58.27),
      new Square(this.lato, 4, 3, '100,0,0', this.ctx, 61.74),
      new Square(this.lato, 4, 4, '100,0,0', this.ctx, 155.56),
      new Square(this.lato, 4, 7, '100,0,0', this.ctx, 69.30),
      new Square(this.lato, 4, 9, '100,0,0', this.ctx, this.getRandomInt(3000, 50)),
      new Square(this.lato, 4, 11, '100,0,0', this.ctx, 155.56),
      new Square(this.lato, 4, 13, '100,0,0', this.ctx, 523.25),
      new Square(this.lato, 4, 14, '100,0,0', this.ctx, 185.00),
      new Square(this.lato, 2, 16, '100,0,0', this.ctx, 174.61),
      new Square(this.lato, 2, 9, '100,0,0', this.ctx, 73.42),
      new Square(this.lato, 2, 11, '100,0,0', this.ctx, 77.78),
      new Square(this.lato, 2, 13, '100,0,0', this.ctx, 82.41),
      new Square(this.lato, 2, 14, '100,0,0', this.ctx, 233.08),
      new Square(this.lato, 2, 15, '100,0,0', this.ctx, 92.50),
      new Square(this.lato, 2, 1, '100,0,0', this.ctx, 311.13),
      new Square(this.lato, 2, 3, '100,0,0', this.ctx, 116.54),
      new Square(this.lato, 2, 4, '100,0,0', this.ctx, 155.56),
      new Square(this.lato, 2, 7, '100,0,0', this.ctx, 69.30),
      new Square(this.lato, 2, 9, '100,0,0', this.ctx, 73.42),
      new Square(this.lato, 14, 9, '100,0,0', this.ctx, 73.42),
      new Square(this.lato, 13, 11, '100,0,0', this.ctx, 523.25),
      new Square(this.lato, 14, 13, '100,0,0', this.ctx, 116.54),
      new Square(this.lato, 13, 14, '100,0,0', this.ctx, 87.31),
      new Square(this.lato, 14, 15, '100,0,0', this.ctx, 92.50),
      new Square(this.lato, 15, 1, '100,0,0', this.ctx, 58.27),
      new Square(this.lato, 15, 3, '100,0,0', this.ctx, 415.30),
      new Square(this.lato, 15, 4, '100,0,0', this.ctx, 155.56),
      new Square(this.lato, 15, 7, '100,0,0', this.ctx, 69.30),
      new Square(this.lato, 15, 8, '100,0,0', this.ctx, 233.08),
      new Square(this.lato, 10, 14, '100,0,0', this.ctx, 92.50),
      new Square(this.lato, 7, 1, '100,0,0', this.ctx, 311.13),
      new Square(this.lato, 7, 3, '100,0,0', this.ctx, 61.74),
      new Square(this.lato, 7, 5, '100,0,0', this.ctx, 155.56),
      new Square(this.lato, 7, 7, '100,0,0', this.ctx, 116.54),
      new Square(this.lato, 7, 9, '100,0,0', this.ctx, 73.42),
      new Square(this.lato, 7, 11, '100,0,0', this.ctx, 155.56),
      new Square(this.lato, 7, 12, '100,0,0', this.ctx, 523.25),
      new Square(this.lato, 7, 14, '100,0,0', this.ctx, 415.30),
      new Square(this.lato, 7, 16, '100,0,0', this.ctx, 174.61),
      new Square(this.lato, 7, 9, '100,0,0', this.ctx, 73.42),
      new Square(this.lato, 9, 1, '100,0,0', this.ctx, 415.30),
      new Square(this.lato, 9, 3, '100,0,0', this.ctx, 233.08),
      new Square(this.lato, 9, 4, '100,0,0', this.ctx, 155.56),
      new Square(this.lato, 9, 5, '100,0,0', this.ctx, 69.30),
      new Square(this.lato, 9, 7, '100,0,0', this.ctx, 116.54),
      new Square(this.lato, 9, 9, '100,0,0', this.ctx, 155.56),
      new Square(this.lato, 9, 10, '100,0,0', this.ctx, 311.13),
      new Square(this.lato, 9, 11, '100,0,0', this.ctx, 185.00),
      new Square(this.lato, 9, 13, '100,0,0', this.ctx, 174.61),
      new Square(this.lato, 9, 14, '100,0,0', this.ctx, 73.42),
      new Square(this.lato, 1, 2, '100,0,0', this.ctx, 58.27),
      new Square(this.lato, 1, 3, '100,0,0', this.ctx, 2415.30),
      new Square(this.lato, 1, 5, '100,0,0', this.ctx, 155.56),
      new Square(this.lato, 1, 7, '100,0,0', this.ctx, 69.30),
      new Square(this.lato, 1, 8, '100,0,0', this.ctx, 73.42),
      new Square(this.lato, 1, 10, '100,0,0', this.ctx, 311.13),
      new Square(this.lato, 1, 11, '100,0,0', this.ctx, 415.30),
      new Square(this.lato, 1, 12, '100,0,0', this.ctx, 174.61),
      new Square(this.lato, 1, 14, '100,0,0', this.ctx, 116.54),
    ];


    this.userGui = new UserGui(0, 0, this.ctxGui, this.coord, this.collisionsNumber, '0,0,0');
    this.userGui.draw();
    this.standUpEnemies();

    this.squares.forEach((square: Cursor) => {
      this.coord = { x: square.getX(), y: square.getY() };
      square.setColor('0,0,0');
      const col: Collision = this.collisionsArrayControl(square);
     
      switch (this.key) {
        case 'w':
          if (col.esito) {
            if (square.getY() > 0) {
              square.moveUp();
            }
            else {
              if (square.getY() == 0) {
                square.setY(15)
              } else {
                square.standUp()
              }
            }
          } else {
            this.collisionsNumber++;
            this.manage('UP', square, col.indice);

          }
          break;
        case 'a':
          if (col.esito) {
            if (square.getX() > 0) {
              square.moveLeft();
            } else {
              if (square.getX() == 0) {
                square.setX(15)
              } else { square.standUp() }
            };
          } else {

            this.manage('LEFT', square, col.indice);
            this.collisionsNumber++;
          }
          break;
        case 's':
          if (col.esito) {
            if (square.getY() < 15) {
              square.moveDown()
            } else {
              if (square.getY() == 15) {
                square.setY(0)
              } else {
                square.standUp()
              }
            }
          } else {
            this.manage('DOWN', square, col.indice);
            this.collisionsNumber++;

          }
          break;
        case 'd':
          if (col.esito) {
            if (square.getX() < 15) {
              square.moveRight();
            } else {
              if (square.getX() == 15) {
                square.setX(0)
              } else {
                square.standUp()
              }
            };
          } else {
            this.collisionsNumber++;
            this.manage('RIGHT', square, col.indice);
          }
          break;
        default: square.standUp();
          break;
      }

    });

    this.requestId = requestAnimationFrame(() => { this.tick });

  }
  private standUpEnemies(): void {

    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].standUp();
    }
  }
  private collisionsArrayControl(square: Square): Collision {
    let count;
    for (let i = 0; i < this.enemies.length; i++) {
      if (this.collision(square, this.enemies[i])) {
        return { esito: false, indice: i }
      }
      count = i;
    }
    return { esito: true, indice: count }
  }
  private manage(direction: String, sq: Square, index: number) {
    this.mySound.playOscillator(this.enemies[index].getTune());
    switch (direction) {
      case 'UP': sq.moveUp(); break;
      case 'DOWN': sq.moveDown(); break;
      case 'LEFT': sq.moveLeft(); break;
      case 'RIGHT': sq.moveRight(); break;
    }
  }

  public start() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctxGui.clearRect(0, 0, this.ctxGui.canvas.width, this.ctxGui.canvas.height);
    this.block = new Square(this.lato, this.getRandomInt(15, 0), this.getRandomInt(15, 0), '110,0,0', this.ctx, 100);
    this.block2 = new Square(this.lato, this.getRandomInt(15, 0), this.getRandomInt(15, 0), '110,0,0', this.ctx, 200);
    //this.squares.pop();
    const square = new Cursor(this.lato, 0, 0, '100,100,20', this.ctx, 100);
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
    const squareModel = new Square(10, 0, 0, this.randomColorString(), this.ctx, 0);;
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
    return this.getRandomInt(255, 0) + ',' + this.getRandomInt(255, 0) + ',' + this.getRandomInt(255, 0);
  }
  private getRandomInt(maxValue: number, minValue: number) {
    return Math.floor(Math.random() * (maxValue - 0)) + minValue; //Il max è escluso e il min è incluso
  }
  collision(player: Square, enemy: Square) {
    var distX = Math.abs(player.getX() - enemy.getX() - enemy.getDimensioneLato());
    var distY = Math.abs(player.getY() - enemy.getY() - enemy.getDimensioneLato());



    var dx = distX - enemy.getDimensioneLato();
    var dy = distY - enemy.getDimensioneLato();

    return (dx == 0 && dy == 0);
  }

}
