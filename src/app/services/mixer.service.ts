import { Injectable } from '@angular/core';
import { TimerService } from '../services/timer.service';

@Injectable()
export class MixerService {

   constructor(public ts: TimerService) { }

}