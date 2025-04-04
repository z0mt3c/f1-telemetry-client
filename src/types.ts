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

export interface ParsedMessage<T> {
  id: number
  format: number
  year: number | undefined
  name: string
  data: T | undefined
  remoteInfo?: RemoteInfo
  message?: Buffer
}

export class ParserError<T> extends Error {
  cause: unknown
  context: Partial<ParsedMessage<T>>

  constructor (message: string, cause: unknown, context: Partial<ParsedMessage<T>>) {
    super(message)
    this.name = 'ParserError'
    this.cause = cause
    this.context = context
  }
}
