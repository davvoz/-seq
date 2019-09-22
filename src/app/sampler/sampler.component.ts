import { Component, OnInit } from '@angular/core';
import { PianoRollComponent } from '../piano-roll/piano-roll.component'
import { TimerService } from '../services/timer.service';
import { SoundService } from '../services/sound.service';
@Component({
  selector: 'app-sampler',
  templateUrl: './sampler.component.html',
  styleUrls: ['./sampler.component.css']
})
export class SamplerComponent extends PianoRollComponent {

  constructor(public myTimer: TimerService, public mySound: SoundService, public ngZone: NgZone) {
    super(myTimer, mySound, ngZone);
  }



}