import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { SoundService } from './services/sound.service';
import { TimerService } from './services/timer.service';
import { TimerMonitorComponent } from './timer-monitor/timer-monitor.component';
import { SpeedControlComponent } from './speed-control/speed-control.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, TimerMonitorComponent, SpeedControlComponent ],
  bootstrap:    [ AppComponent ],
  providers: [SoundService, TimerService]
})
export class AppModule { }
