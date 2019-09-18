import { Component, HostListener, ElementRef, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerService } from './services/timer.service';
import { SoundService } from './services/sound.service';
import { RadioBtn, Adsr } from './interfaces/interfaces';
import { Square } from './classes/square';
import { UserGui } from './classes/user-gui';
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

  enemies: Square[] = [this.block, this.block2, this.block3, this.block4, this.block5];

  collisionsNumber = 0;
  l1 = this.getRandomInt(14, 0);
  l2 = this.getRandomInt(14, 0);
  l3 = this.getRandomInt(14, 0);
  l4 = this.getRandomInt(14, 0);

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

      /this.tick();
    }, 150);


  }
  tick() {

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctxGui.clearRect(0, 0, this.ctxGui.canvas.width, this.ctxGui.canvas.height);

    this.enemies = [
      new Square(this.lato, 10, 1, '110,0,0', this.ctx, 200),
      new Square(this.lato, 10, 2, '0,110,0', this.ctx, 300),
      new Square(this.lato, 10, 5, '0,0,110', this.ctx, 400),
      new Square(this.lato, 10, 6, '110,70,0', this.ctx, 500),
      new Square(this.lato, 10, 9, '110,0,70', this.ctx, 600),
      new Square(this.lato, 10, 10, '70,70,110', this.ctx, 700),
      new Square(this.lato, 10, 13, '110,0,0', this.ctx, 800),
      new Square(this.lato, 10, 14, '110,0,0', this.ctx, 900),
      new Square(this.lato, 1, 3, '110,0,0', this.ctx, 200),
      new Square(this.lato, 2, 3, '0,110,0', this.ctx, 300),
      new Square(this.lato, 5, 3, '0,0,110', this.ctx, 400),
      new Square(this.lato, 6, 3, '110,70,0', this.ctx, 500),
      new Square(this.lato, 9, 3, '110,0,70', this.ctx, 600),
      new Square(this.lato, 10, 3, '70,70,110', this.ctx, 700),
      new Square(this.lato, 13, 3, '110,0,0', this.ctx, 800),
      new Square(this.lato, 14, 3, '110,0,0', this.ctx, 900)
    ];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 1; j++) {
        this.enemies[i+j] = new Square(this.lato, i, j, '110,0,0', this.ctx, 900)
      }
    }


    this.userGui = new UserGui(this.ctxGui, this.coord, this.collisionsNumber);
    this.userGui.draw();
    this.standUpEnemies();

    this.squares.forEach((square: Square) => {
      this.coord = { x: square.getX(), y: square.getY() };
      square.setColor('0,0,0');
      let col: Collision = this.collisionsArrayControl(square);

      switch (this.key) {
        case 'w':
          if (col.esito) {
            if (square.getY() > 0) {
              square.moveUp();
            }
            else {
              if (square.getY() == 0) {
                square.setY(14)
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
                square.setX(14)
              } else { square.standUp() }
            };
          } else {
            this.collisionsNumber++;
            this.manage('LEFT', square, col.indice);
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
            this.collisionsNumber++;
            this.manage('DOWN', square, col.indice);
          }
          break;
        case 'd':
          if (col.esito) {
            if (square.getX() < 14) {
              square.moveRight();
            } else {
              if (square.getX() == 14) {
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
    let i = 0;
    for (let e of this.enemies) {
      if (this.collision(square, e)) {
        return { esito: false, indice: i }
      }
      i++;
    }
    return { esito: true, indice: i }
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
    this.block = new Square(this.lato, this.getRandomInt(14, 0), this.getRandomInt(14, 0), '110,0,0', this.ctx, 100);
    this.block2 = new Square(this.lato, this.getRandomInt(14, 0), this.getRandomInt(14, 0), '110,0,0', this.ctx, 200);
    this.squares.pop();
    const square = new Square(this.lato, 0, 0, '100,100,20', this.ctx, 100);
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
