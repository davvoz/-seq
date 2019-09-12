import { Component, OnInit } from '@angular/core';
import { TimerService } from '../services/timer.service';
import { SoundService } from '../services/sound.service';
@Component({
  selector: 'app-speed-control',
  templateUrl: './speed-control.component.html',
  styleUrls: ['./speed-control.component.css']
})
export class SpeedControlComponent implements OnInit {

  constructor(public myTimer: TimerService, public mySound: SoundService) { }

  ngOnInit() {
  }

}