export type Binary = '0 | 1' ;
export interface RadioBtn {
  name: String;
  freqSelected: number;
  isPlay: boolean;
}
export interface Adsr {
  attack: number;
  decay: number;
  sustain: number;
  sustainVal:number;
  relase: number;
}
export interface Step {
  sustain: number;
  gain: number;
  type: string;
  frequency: number;
  detune: number;
  play: boolean;
}
export interface StepSampler {
  gain: number;
  samplePath: string;
  sampleTune: number;
  filterFrequency: number;
  filterGain: number;
  play: boolean;
  duration: number;
}
export interface PresetSampler {
  titolo: string;
  note: StepSampler[];
}
export interface Preset {
  titolo: string;
  note: Step[];
}
export declare type TOStepSequencerComponentType = 'oscillator' | 'sampler';


export interface TickResponse {
  traksAreOn: boolean[];
  timePosition: number;
  isStarted: boolean;
  audioContextTime: number;
}

export interface Coordinates{
  x:number;
  y:number;
}

export interface Drowable{
   draw():void;
   erase():void;
}
export interface Collision{
  esito:boolean;
  indice:number;
}

export type Orientation = 'VERTICALE|ORIZZONTALE';
export type Freq = [110.00, 116.54, 123.47, 130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185.00, 196.00, 207.65];