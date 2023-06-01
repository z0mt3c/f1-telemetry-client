export interface Team {
  name: string;
  color: string;
}

export interface Driver {
  firstName: string;
  lastName: string;
  abbreviation: string;
}

export interface Track {
  name: string;
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface Tyre {
  color: string;
  name: string;
}

export type Packet =
  | 'motion'
  | 'session'
  | 'lapData'
  | 'event'
  | 'participants'
  | 'carSetups'
  | 'carTelemetry'
  | 'carStatus'
  | 'finalClassification'
  | 'lobbyInfo'
  | 'carDamage'
  | 'sessionHistory'
  | 'tyreSets'
  | 'motionEx';

export type PacketSize = number;

export interface SessionTypes {
  short: string;
  long: string;
}

export type EventCode = string;
