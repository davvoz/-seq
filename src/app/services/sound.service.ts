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
  public waveform = 'sine';
  constructor(public ts: TimerService) { }

  public playOscillator(freq) {

    this.inizializzaADSR();
    //this.inizializza();
    this.frequency = freq;
    // create Oscillator node
    let oscillator = this.ts.audioContext.createOscillator();
    let gainNode = this.ts.audioContext.createGain();
    let ct = this.ts.audioContext.currentTime;
    gainNode.gain.value = this.gain;


    oscillator.frequency.setValueAtTime(freq, ct); // value in hertz
    oscillator.connect(gainNode);
    switch (this.waveform) {
      case 'square': oscillator.type = 'square'; break;
      case 'sine': oscillator.type = 'sine'; break;
      case 'sawtooth': oscillator.type = 'sawtooth'; break;
    }
    gainNode.connect(this.ts.audioContext.destination);
    oscillator.start();


    gainNode.gain.setValueAtTime(0, ct);
    gainNode.gain.linearRampToValueAtTime(1, ct + this.attack);
    gainNode.gain.linearRampToValueAtTime(this.sustainVal, ct + this.attack + this.decay);
    gainNode.gain.linearRampToValueAtTime(this.sustainVal, ct + this.attack + this.decay + this.sustain);
    gainNode.gain.linearRampToValueAtTime(0, ct + this.attack + this.decay + this.sustain + this.relase);
    oscillator.stop(ct + this.attack + this.decay + this.sustain + this.relase);
    console.log(this.attack, this.decay, this.sustain, this.sustainVal, this.relase);

  }
  private inizializza(): void {
    this.attack = 0;
    this.decay = 0.1;
    this.sustain = 0.0;
    this.sustainVal = 0.01;
    this.relase = 0.1;
  }
  private inizializzaADSR(): void {
    this.attack = parseFloat(this.attack + '');
    this.decay = parseFloat(this.decay + '');
    this.sustain = parseFloat(this.sustain + '');
    this.sustainVal = parseFloat(this.sustainVal + '');
    this.relase = parseFloat(this.relase + '');
  }

}