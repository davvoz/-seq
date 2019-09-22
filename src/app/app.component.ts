import { Component, HostListener, ElementRef, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { TimerService } from './services/timer.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  pianoRolls = ['pR'];
  constructor(public myTimer: TimerService) {

  }
  add() {
    this.myTimer.addTrack();
    this.myTimer.steps = 0;
    this.pianoRolls.push('pR');
  }
  remove(index) {
    this.myTimer.removeTrack(index);
    this.pianoRolls.splice(index,1);
  }
}
