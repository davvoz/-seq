import { Component, OnInit, NgZone } from '@angular/core';
import { PianoRollComponent } from '../piano-roll/piano-roll.component'
import { TimerService } from '../services/timer.service';
import { SamplerService } from '../services/sampler.service';
import {SamplesLibraryService} from '../services/samples-library.service';
import { SoundService } from '../services/sound.service';

@Component({
  selector: 'app-piano-roll-sampler',
  templateUrl: './piano-roll-sampler.component.html',
  styleUrls: ['./piano-roll-sampler.component.css']
})
export class PianoRollSamplerComponent extends PianoRollComponent {
  samples = ['Kick'];
  sampleSelected = 'Kick';
  sample;
  constructor(public myTimer: TimerService, public mySound: SoundService, public ngZone: NgZone,public mySample: SamplerService,
    public library: SamplesLibraryService) {
    super(myTimer, mySound, ngZone);
    this.title = 'SAMPLER';
    
  }

  playStep(){
   this.mySample.playSampler(10,200,0,!this.isMuted,1,this.filterCutoff,this.filterReso,this.filterSelected,true);
    console.log('samecw')
  }


}