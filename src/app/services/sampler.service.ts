import { Injectable } from '@angular/core';
import { SamplesLibraryService } from '../services/samples-library.service';
import { TimerService } from '../services/timer.service';
@Injectable()
export class SamplerService {

  constructor(public ts: TimerService, private library: SamplesLibraryService) {

  }
  playSampler(
    volume: number,
    tune: number,
    libIndex: number,
    playing: boolean,
    duration: number,
    filterFrequency: number,
    filterGain: number,
    filterType: string,
    isFiltred: boolean,

  ): void {
    console.log(volume,tune,libIndex,playing,duration,filterFrequency,filterGain,filterType,isFiltred);
    let ct =  this.ts.audioContext.currentTime;
    let gainNode = this.ts.audioContext.createGain();
    let biquadFilter = this.ts.audioContext.createBiquadFilter();
    let source = this.ts.audioContext.createBufferSource();
    source.buffer = this.library.buffers[libIndex];
    source.playbackRate.setTargetAtTime(tune, ct, 0);
    gainNode.gain.setTargetAtTime(volume, ct, 0);
    if (playing) {
      if (isFiltred) {
        switch (filterType) {
          case 'lowpass': biquadFilter.type = 'lowpass'; break;
          case 'highpass': biquadFilter.type = 'highpass'; break;
          case 'bandpass': biquadFilter.type = 'bandpass'; break;
          case 'lowshelf': biquadFilter.type = 'lowshelf'; break;
          case 'peaking': biquadFilter.type = 'peaking'; break;
          case 'notch': biquadFilter.type = 'notch'; break;
          case 'allpass': biquadFilter.type = 'allpass'; break;
        }
        //biquadFilter.type = filterType as TBiquadFilterType;
        biquadFilter.frequency.setTargetAtTime(filterFrequency, ct, 0);
        biquadFilter.gain.setTargetAtTime(filterGain, ct, 0);
        source.start(ct);
        source.connect(biquadFilter);
        biquadFilter.connect(gainNode);
      } else {
        source.start(ct);
        source.connect(gainNode);
      }
      gainNode.connect(this.ts.audioContext.destination);
      source.stop(ct + duration);
    }
    gainNode = null;
    biquadFilter = null;
    source = null;
    console.log('played');
  }

}