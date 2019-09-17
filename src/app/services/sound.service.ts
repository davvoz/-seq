import { Injectable } from '@angular/core';
import { TimerService } from '../services/timer.service';

import { Adsr } from '../interfaces/interfaces';

@Injectable()
export class SoundService implements Adsr {
  public frequency = 0;
  public gain = 0;
  public attack = 0;
  public decay = 0;
  public sustain = 0;
  public relase = 0;
  public sustainVal = 0;
  constructor(public ts: TimerService) { }

  public playOscillator(freq) {
    //this.attack = parseFloat(this.attack + '');
    //this.decay = parseFloat(this.decay + '');
    //this.sustain = parseFloat(this.sustain + '');
    //this.sustainVal = parseFloat(this.sustainVal + '');
    //this.relase = parseFloat(this.relase + '');
    this.attack = 0;
    this.decay =0;
    this.sustain =0;
    this.sustainVal = 0;
    this.relase = 0;

    this.frequency = freq;
    // create Oscillator node
    let oscillator = this.ts.audioContext.createOscillator();
    let gainNode = this.ts.audioContext.createGain();
    let ct = this.ts.audioContext.currentTime;
    gainNode.gain.value = this.gain;


    oscillator.frequency.setValueAtTime(freq - 100, ct); // value in hertz
    oscillator.connect(gainNode);
    oscillator.type = 'square';
    gainNode.connect(this.ts.audioContext.destination);
    oscillator.start();


    gainNode.gain.setValueAtTime(0, ct);
    gainNode.gain.linearRampToValueAtTime(1, ct + this.attack);
    gainNode.gain.linearRampToValueAtTime(this.sustainVal, ct + this.attack + this.decay);
    gainNode.gain.linearRampToValueAtTime(this.sustainVal, ct + this.attack + this.decay + this.sustain);
    gainNode.gain.linearRampToValueAtTime(0, ct + this.attack + this.decay + this.sustain + this.relase);
    oscillator.stop(ct + this.attack + this.decay + this.sustain + this.relase);

  }

}