import { Component, HostListener, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerService } from './services/timer.service';
import { SoundService } from './services/sound.service';
import { RadioBtn, Adsr } from './interfaces/interfaces';
import { Square } from './classes/square';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)'
  }
})
export class AppComponent implements AfterViewInit {


  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.single(event.key);
  }



  radioButtons: Array<RadioBtn> = [];
  isPlayed = false;
  subscription: Subscription;
  frequency = 0;
  gain = 0;
  width = 300;
  public attack = 0;
  public decay = 0;
  public sustain = 0;
  public relase = 0;
  public sustainVal = 0;
  matrix = [[]];
  fre = [];
  arrBeats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  frequencies = [110.00, 116.54, 123.47, 130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185.00, 196.00, 207.65];
  w; h; cellwidth; cellheight;
  @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;



  constructor(public myTimer: TimerService, public mySound: SoundService) {



    for (let i = 0; i < this.arrBeats.length; i++) {
      this.matrix.push([]);
      for (let j = 0; j < this.frequencies.length; j++) {
        this.matrix[i].push(false)
      }
    }

    for (let i = 0; i < this.arrBeats.length; i++) {
      this.radioButtons.push({ name: 'beat' + i, freqSelected: 110.00, isPlay: false });
    }

    this.subscription = this.myTimer.trackStateItem$
      .subscribe(res => {
        this.mySound.attack = this.attack;
        this.mySound.decay = this.decay;
        this.mySound.sustain = this.sustain;
        this.mySound.sustainVal = this.sustainVal;
        this.mySound.relase = this.relase;
        this.mySound.gain = this.gain;
        if (this.isPlayed) {
          this.drawPlayHead(res.timePosition);
          if (this.radioButtons[res.timePosition].isPlay == true) {

            this.mySound.playOscillator(this.radioButtons[res.timePosition].freqSelected + this.frequency);
          }

        }
      });

  }
  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext("2d");
    this.w = this.canvas.nativeElement.scrollWidth;
    this.h = this.canvas.nativeElement.scrollHeight;
    this.cellwidth = this.w / 8;
    this.cellheight = this.h / 12;
    this.resizeCanvasToDisplaySize(this.canvas);
    //this.drawPianoGrid();
    //this.drawPlayHead(0);
    this.drawSquare(new Square(0,0,20));
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
  public single(val) {
    this.mySound.playOscillator(val * 15);
  }
  getColor(number) {
    if (this.myTimer.steps + 1 == number) {
      return '#199'
    } else {
      return '#119'
    }
  }
  drawSquare(s: Square) {
    this.ctx.fillStyle = "rgb(128,128,128)";
    this.ctx.rect(s.getX() , s.getY() , s.getDimensioneLato(), s.getDimensioneLato());
    this.ctx.fill()
    this.ctx.stroke();
  }
  handleChange(event) {
    this.drawNote(this.getMousePos(event).x, this.getMousePos(event).y, 1);

  }

  drawNote(x, y, length, selected = false) {

    if (x < this.cellwidth) {
      x = 0;
    } else {
      x = parseInt((x + '').substr(0, 1), 10);
    }
    if (y < this.cellheight) {
      y = 0;
    } else {
      y = parseInt((y + '').substr(0, 1), 10);
    }

    console.log(y);
    this.ctx.fillStyle = "rgb(128,128,128)";
    if (selected) {
      this.ctx.strokeStyle = "rgb(255,255,255)";
    } else {
      this.ctx.strokeStyle = "rgb(24,24,24)";
    }
    this.ctx.rect(x * this.cellwidth, y * this.cellheight, this.cellwidth * length, this.cellheight);
    this.ctx.fill()
    this.ctx.stroke();
  }

  drawPlayHead(x) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, 0);
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "red";
    this.ctx.lineTo(x, this.h);
    this.ctx.shadowBlur = 0;
    this.ctx.stroke();
  }


  drawPianoGrid() {


    for (let y = 0; y < this.w; y = y + this.cellheight) {
      for (let x = 0; x < this.w; x = x + this.cellwidth) {
        if (x % 8 == 0) {
          this.ctx.beginPath();
          this.ctx.moveTo(x, 0);
          this.ctx.strokeStyle = "black";
          this.ctx.lineTo(x, this.h);
          this.ctx.shadowBlur = 0;
          this.ctx.stroke();
        }
        this.ctx.beginPath();
        if (y % 8) {
          this.ctx.fillStyle = "rgb(32,32,32)";
        } else {
          this.ctx.fillStyle = "rgb(40,40,40)";
        }
        this.ctx.strokeStyle = "rgb(24,24,24)";
        this.ctx.rect(x, y, this.cellwidth, this.cellheight);
        this.ctx.fill()
        this.ctx.stroke();
      }
    }
  }
  private dividi(x, y) {
    let z = 0;
    let i = x;
    while (i >= y) {
      i = i - y;
      z++;
    }
    return z;
  }
  resizeCanvasToDisplaySize(canvas) {
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      return true;
    }

    return false;
  }
  private getMousePos(evt) {
    let rect = this.canvas.nativeElement.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

}
