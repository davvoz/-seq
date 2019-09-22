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
  public muted = false;
  public filterType = 'allpass';
  public filterReso = 5;
  public filterCutoff = 200;
  public filtered = false;
  constructor(public ts: TimerService) { }

  public playOscillator(freq) {
    if (!this.muted) {
      this.inizializzaADSR();
      //this.inizializza();
      this.frequency = freq;
      let ct = this.ts.audioContext.currentTime;

      let oscillator = this.ts.audioContext.createOscillator();
      let gainNode = this.ts.audioContext.createGain();
      let biquadFilter = this.ts.audioContext.createBiquadFilter();
      let volume = this.ts.audioContext.createGain();

      switch(this.waveform) {
        case 'square': oscillator.type = 'square'; break;
        case 'sine': oscillator.type = 'sine'; break;
        case 'sawtooth': oscillator.type = 'sawtooth'; break;
        case 'triangle': oscillator.type = 'triangle'; break;
      }

      switch (this.filterType) {
        case 'lowpass': biquadFilter.type = 'lowpass'; break;
        case 'highpass': biquadFilter.type = 'highpass'; break;
        case 'bandpass': biquadFilter.type = 'bandpass'; break;
        case 'lowshelf': biquadFilter.type = 'lowshelf'; break;
        case 'peaking': biquadFilter.type = 'peaking'; break;
        case 'notch': biquadFilter.type = 'notch'; break;
        case 'allpass': biquadFilter.type = 'allpass'; break;
      }
      gainNode.gain.setValueAtTime(this.gain, ct);
      oscillator.frequency.setValueAtTime(this.frequency, ct);
      biquadFilter.frequency.setValueAtTime(this.filterCutoff, ct);
      biquadFilter.gain.setValueAtTime(this.filterReso, ct);
      oscillator.frequency.setValueAtTime(freq, ct);
      volume.gain.setValueAtTime(this.gain, ct);
      
      oscillator.connect(biquadFilter);
      biquadFilter.connect(gainNode);
      gainNode.connect(volume);
      volume.connect(this.ts.audioContext.destination);
      
      oscillator.start();
      gainNode.gain.setValueAtTime(0, ct);
      gainNode.gain.linearRampToValueAtTime(1, ct + this.attack);
      gainNode.gain.linearRampToValueAtTime(this.sustainVal, ct + this.attack + this.decay);
      gainNode.gain.linearRampToValueAtTime(this.sustainVal, ct + this.attack + this.decay + this.sustain);
      gainNode.gain.linearRampToValueAtTime(0, ct + this.attack + this.decay + this.sustain + this.relase);
      oscillator.stop(ct + this.attack + this.decay + this.sustain + this.relase);
    }


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