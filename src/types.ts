import type { RemoteInfo } from 'node:dgram'
import {
  type PacketCarDamageData,
  type PacketCarSetupData,
  type PacketCarStatusData,
  type PacketCarTelemetryData,
  type PacketEvent,
  type PacketFinalClassificationData,
  type PacketLapData,
  type PacketLobbyInfoData,
  type PacketMotionData,
  type PacketMotionExData,
  type PacketParticipantsData,
  type PacketSessionData,
  type PacketSessionHistoryData,
  type PacketTimeTrialData,
  type PacketTyreSetsData
} from './parsers/packets/types'

export interface Options {
  port?: number
  forwardAddresses?: Address[] | undefined
  bigintEnabled?: boolean
  skipParsing?: boolean
}

export interface Address {
  port: number
  ip?: string
}

export type PacketData =
  | PacketSessionHistoryData
  | PacketSessionData
  | PacketMotionData
  | PacketLapData
  | PacketEvent
  | PacketParticipantsData
  | PacketCarSetupData
  | PacketCarTelemetryData
  | PacketCarStatusData
  | PacketCarDamageData
  | PacketFinalClassificationData
  | PacketLobbyInfoData
  | PacketTyreSetsData
  | PacketMotionExData
  | PacketTimeTrialData

export interface ParsedMessage {
  id: number
  format: number
  name: string
  data: PacketData
  remoteInfo?: RemoteInfo
  message?: Buffer
}

export type EventKeys = 'SessionStarted' | 'SessionEnded' | 'FastestLap' | 'Retirement' | 'DRSEnabled' | 'DRSDisabled' | 'TeammateInPits' | 'ChequeredFlag' | 'RaceWinner' | 'PenaltyIssued' | 'SpeedTrapTriggered' | 'StartLights' | 'LightsOut' | 'DriveThroughServed' | 'StopGoServed' | 'Flashback' | 'ButtonStatus' | 'RedFlag' | 'Overtake' | 'SafetyCar' | 'Collision'
