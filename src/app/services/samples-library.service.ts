
import { Injectable } from '@angular/core';
@Injectable()
export class SamplesLibraryService {
    public buffers = [];
    constructor(private _audioContext: AudioContext) {
      console.log('ciao');
        this.loadSounds('../../assets/WAV/DD_kick.wav');
    }

    private loadSounds(path): void {
        const request = new XMLHttpRequest();
        request.open('GET', path, true);
        request.responseType = 'arraybuffer';
        const context = this._audioContext;
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