import { TimerService } from './timer.service';
import { Injectable } from '@angular/core';
@Injectable()
export class SamplesLibraryService {
    public buffers = [];
    constructor(public myTimer:TimerService) {
       this.loadSounds('./../assets/WAV/DD_Kick.wav');
    }

    private loadSounds(path): void {
        const request = new XMLHttpRequest();
        request.open('GET', path, true);
        request.responseType = 'arraybuffer';
        const context = this.myTimer.audioContext;
        request.onload = () => {
            context.decodeAudioData(
                request.response,
                buffer => {
                    if (!buffer) {
                        alert('error decoding file data: ' + path);
                        return;
                    }
                    this.buffers.push(buffer);
                    console.log(this.buffers);
                },
                error => {
                  console.log(error.name);
                    console.error('decodeAudioData error', error);
                }

            );
        };
        request.onerror = () => {
            alert('BufferLoader: XHR error');
        };
        request.send();
    }
}