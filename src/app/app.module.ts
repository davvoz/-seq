import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SoundService } from './services/sound.service';
import { TimerService } from './services/timer.service';
import { TimerMonitorComponent } from './timer-monitor/timer-monitor.component';
import { SpeedControlComponent } from './speed-control/speed-control.component';
import { PianoRollComponent } from './piano-roll/piano-roll.component';
import { StartStopComponent } from './start-stop/start-stop.component';
import { MixerService } from './services/mixer.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, TimerMonitorComponent, SpeedControlComponent, PianoRollComponent, StartStopComponent ],
  bootstrap:    [ AppComponent ],
  providers: [SoundService, TimerService, MixerService]
})
export class AppModule { }
