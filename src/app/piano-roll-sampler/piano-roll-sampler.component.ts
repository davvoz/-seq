import { Component, OnInit, NgZone, HostListener, ViewChild ,ElementRef} from '@angular/core';
import { PianoRollComponent } from '../piano-roll/piano-roll.component'
import { TimerService } from '../services/timer.service';
import { SamplerService } from '../services/sampler.service';
import { SamplesLibraryService } from '../services/samples-library.service';
import { Coordinates, Collision } from '../interfaces/interfaces';
import { Subscription } from 'rxjs';
import { UserGui } from '../classes/user-gui';
import { Square } from '../classes/square';
import { LineOfSquares } from '../classes/line-of-squares';


@Component({
  selector: 'app-piano-roll-sampler',
  templateUrl: './piano-roll-sampler.component.html',
  styleUrls: ['./piano-roll-sampler.component.css']
})
export class PianoRollSamplerComponent {
  samples = ['Kick'];
  sampleSelected = 'Kick';
  sample;
  title;
  isMuted = false;;
  filterCutoff = 0;;
  filterReso = 0;
  freq = [110.00, 116.54, 123.47, 130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185.00, 196.00, 207.65, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.00, 415.30, 440.0, 466.16, 493.88, 523.25];
  key;
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
  }


  isPlayed = false;
  subscription: Subscription;
  frequency = 0;
  gain = 0;
  width = 300;
  lato = 20;
  attack = 0;
  decay = 0;
  sustain = 0;
  relase = 0;
  sustainVal = 0;


  coord: Coordinates = { x: 0, y: 0 };
  @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvasGui', { static: false }) canvasGui: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvasLine', { static: false }) canvasLine: ElementRef<HTMLCanvasElement>;
  private ctxGui: CanvasRenderingContext2D;
  private ctx: CanvasRenderingContext2D;
  private ctxLine: CanvasRenderingContext2D;

  userGui: UserGui;
  enemies: Square[] = [];
  myLine: LineOfSquares;
  waveSelected = 'square';
  filterSelected = 'allpass';
  waveforms = ['square', 'sine', 'sawtooth', 'triangle'];
  filterType = ['lowpass', 'highpass', 'bandpass', 'lowshelf', 'peaking', 'notch', 'allpass']

  constructor(public myTimer: TimerService, public ngZone: NgZone, public mySample: SamplerService,


    public library: SamplesLibraryService) {
    this.title = 'SAMPLER';
  }
ngAfterViewInit() {
    this.ctxGui = this.canvasGui.nativeElement.getContext("2d");
    this.ctx = this.canvas.nativeElement.getContext("2d");
    this.ctxLine = this.canvasLine.nativeElement.getContext("2d");

    this.myLine = new LineOfSquares(this.lato, -1, 0, '0,0,0', this.ctxLine, 100, 24, 'VERTICALE');
    this.myLine.standUp();

    this.populateEnemiesArray();
    this.standUpEnemies();

    this.userGui = new UserGui(0, 0, this.ctxGui, { x: 0, y: 0 }, 0, '0,0,0', this.lato);
    this.userGui.draw();

    this.subscription = this.myTimer.trackStateItem$
      .subscribe(res => {
        if (res.traksAreOn) {
          if (res.isStarted) {
            this.tick();
          }
        }

      });
  }

  tick() {
    this.ctxLine.clearRect(0, 0, this.ctxLine.canvas.width, this.ctxLine.canvas.height);
    this.coord = { x: this.myLine.getX(), y: 0 };
    this.myLine.setColor('200,0,0');
    const col: Collision = this.collisionsArrayControl(this.myLine);
    if (this.myLine.getX() == 31) {
      this.myLine.setX(0);
      if (!col.esito) {
        if (this.enemies[col.indice].isStanding()) {
          this.playStep();
        }
      }
    } else {
      this.myLine.moveRight();
      if (this.enemies.length > 0) {
        if (!col.esito) {
          if (this.enemies[col.indice].isStanding()) {
            this.playStep();
          }
        }
      }
    }
  }
  playStep() {
    this.mySample.playSampler(10, 200, 1, !this.isMuted, 1, this.filterCutoff, this.filterReso, this.filterSelected, true);
    console.log('samecw')
  }



  private populateEnemiesArray(): void {
    for (let i = 0; i < this.ctx.canvas.width / this.lato; i++) {
      this.enemies.push(new Square(this.lato, i, 0, '100,100,100', this.ctx, 0));
    }

  }

  private standUpEnemies(): void {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].standUp();
      this.enemies[i].kill();

    }
  }

  private collisionsArrayControl(square: Square): Collision {
    let count = 0;
    for (let i = 0; i < this.enemies.length; i++) {
      if (this.collision(square, this.enemies[i])) {
        //square.setColor(this.randomColorString());
        return { esito: false, indice: i }
      }
      count = i;
    }
    return { esito: true, indice: count }
  }

  public start() {
    this.isPlayed = true;
    this.myTimer.play();
  }

  public stop() {
    this.isPlayed = false;
    this.myTimer.stop()
  }

  public pause() {
    this.isPlayed = false;
    this.myTimer.pause()
  }

  getColor() {
    if (this.isMuted) {
      return 'red'
    } else {
      return 'green'
    }
  }

  private getMousePos(evt) {
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
  private collision(player: Square, enemy: Square) {
    var distX = Math.abs(player.getX() - enemy.getX() - enemy.getDimensioneLato());
    var dx = distX - enemy.getDimensioneLato();
    return (dx == 0);
  }
  handleChange(evt) {
    let coo: Coordinates = this.getMousePos(evt);
    this.enemies[coo.x].isStanding() ? this.enemies[coo.x].kill() : (this.enemies[coo.x].setTune(this.freq[coo.y]), this.enemies[coo.x].setY(coo.y - 1), this.enemies[coo.x].standUp());
  }


}