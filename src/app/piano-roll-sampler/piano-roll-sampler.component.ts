import { Component, OnInit, NgZone } from '@angular/core';
import { PianoRollComponent } from '../piano-roll/piano-roll.component'
import { TimerService } from '../services/timer.service';
import { SoundService } from '../services/sound.service';

@Component({
  selector: 'app-piano-roll-sampler',
  templateUrl: './piano-roll-sampler.component.html',
  styleUrls: ['./piano-roll-sampler.component.css']
})
export class PianoRollSamplerComponent  extends PianoRollComponent{

   constructor(public myTimer: TimerService, public mySound: SoundService, public ngZone: NgZone) {
    super(myTimer, mySound, ngZone);
    this.title = 'SAMPLER';
  }

}