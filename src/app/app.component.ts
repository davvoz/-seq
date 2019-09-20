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
  block: Square = new Square(20, 10, 6, this.randomColorString(), this.ctx, 100);
  block2: Square = new Square(20, 0, 6, this.randomColorString(), this.ctx, 100);
  block3: Square = new Square(20, 6, 6, this.randomColorString(), this.ctx, 100);
  block4: Square = new Square(20, 6, 6, this.randomColorString(), this.ctx, 100);
  block5: Square = new Square(20, 6, 6, this.randomColorString(), this.ctx, 100);
  persistenceColor = { counter: 10, color: '0,0,0' };
  enemies: Square[] = [this.block, this.block2, this.block3, this.block4, this.block5];
  selectedValue = { name: 'collidi', cod: 0 };
  collisionsNumber = 0;
  l1 = this.getRandomInt(16, 0);
  l2 = this.getRandomInt(16, 0);
  l3 = this.getRandomInt(16, 0);
  l4 = this.getRandomInt(16, 0);
  physicMode = [{ name: 'collidi', cod: 0 }, { name: 'rimbalza', cod: 1 }, { name: 'spettro', cod: 2 }];
  borderCollider = false;
  myLine: LineOfSquares;
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
    this.myLine = new LineOfSquares(20, 10, 10, this.randomColorString(), this.ctx, 100, 5, 'VERTICALE');
    this.enemies = [];

    for (let i = 0; i < 16; i++) {
    this.enemies.push(new Square(this.lato, i + 1, 1, this.randomColorString(), this.ctx, this.getRandomInt(500,50)));

    }


    this.ngZone.runOutsideAngular(() => this.tick());
    setInterval(() => {

      this.tick();
    }, 100);


  }
  tick() {

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctxGui.clearRect(0, 0, this.ctxGui.canvas.width, this.ctxGui.canvas.height);

    

    this.userGui = new UserGui(0, 0, this.ctxGui, this.coord, this.collisionsNumber,  this.randomColorString());
    this.userGui.draw();
    this.standUpEnemies();

    this.squares.forEach((square: LineOfSquares) => {
      this.coord = { x: square.getX(), y: square.getY() };
      square.setColor('100,0,0');
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
            if (square.getY() == 15) {
              square.setY(0)
            } else {
              square.standUp()
            }
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
            this.manage('RIGHT', square, col.indice);
            this.collisionsNumber++;
            if (square.getX() == 15) {
              square.setX(0)
            } else {
              square.standUp()
            }

          }
          break;
        default: square.standUp();
          break;
      }

    });

    this.requestId = requestAnimationFrame(() => { this.tick });

  }

  makeid(length) {
    var result = '';
    var characters = 'asdw';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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
        square.setColor( this.randomColorString());
        return { esito: false, indice: i }
      }
      count = i;
    }
    return { esito: true, indice: count }
  }
  private manage(direction: String, sq: Square, index: number) {
    this.mySound.playOscillator(this.enemies[index].getTune()+this.getRandomInt(100,0));
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
    const square = new Square(this.lato, 0, 0, '100,100,20', this.ctx, 100);


    this.squares = this.squares.concat(new LineOfSquares(20, 1, 1, this.randomColorString(), this.ctx, 100, 15, 'VERTICALE'));
    this.squares[0].standUp();


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
    this.squares = this.squares.concat((new LineOfSquares(20, 10, 10, this.randomColorString(), this.ctx, 100, 50, 'VERTICALE')));
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
