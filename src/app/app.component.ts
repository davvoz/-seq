import { Component, HostListener, ElementRef, ViewChild, AfterViewInit, NgZone } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  pianoRolls = [];

  add() {
    this.pianoRolls.push('pR');
  }
  remove() {

  }
}
