import type { EventCode } from './types'

type Keys = 'SessionStarted' | 'SessionEnded' | 'FastestLap' | 'Retirement' | 'DRSEnabled' | 'DRSDisabled' | 'TeammateInPits' | 'ChequeredFlag' | 'RaceWinner' | 'PenaltyIssued' | 'SpeedTrapTriggered' | 'StartLights' | 'LightsOut' | 'DriveThroughServed' | 'StopGoServed' | 'Flashback' | 'ButtonStatus' | 'RedFlag' | 'Overtake'

export const EVENT_CODES: Record<Keys, EventCode> = {
  SessionStarted: 'SSTA',
  SessionEnded: 'SEND',
  FastestLap: 'FTLP',
  Retirement: 'RTMT',
  DRSEnabled: 'DRSE',
  DRSDisabled: 'DRSD',
  TeammateInPits: 'TMPT',
  ChequeredFlag: 'CHQF',
  RaceWinner: 'RCWN',
  PenaltyIssued: 'PENA',
  SpeedTrapTriggered: 'SPTP',
  StartLights: 'STLG',
  LightsOut: 'LGOT',
  DriveThroughServed: 'DTSV',
  StopGoServed: 'SGSV',
  Flashback: 'FLBK',
  ButtonStatus: 'BUTN',
  RedFlag: 'RDFL',
  Overtake: 'OVTK'
}
