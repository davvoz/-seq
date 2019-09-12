import { Component, OnInit } from '@angular/core';
import { TimerService } from '../services/timer.service';
import { SoundService } from '../services/sound.service';

@Component({
  selector: 'app-timer-monitor',
  templateUrl: './timer-monitor.component.html',
  styleUrls: ['./timer-monitor.component.css']
})
export class TimerMonitorComponent implements OnInit {

  constructor(public myTimer: TimerService, public mySound: SoundService) { }

  ngOnInit() {
  }

}