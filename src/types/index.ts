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
  type PacketTyreSetsData,
} from './parserTypes'

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
  remoteInfo?: unknown
  message?: Buffer
}

export class ParserError<T> extends Error {
  cause: unknown
  context: Partial<ParsedMessage<T>>

  constructor(message: string, cause: unknown, context: Partial<ParsedMessage<T>>) {
    super(message)
    this.name = 'ParserError'
    this.cause = cause
    this.context = context
  }
}

export {
  PacketHeader,
  PacketSessionData,
  Packet,
  EventCode,
  PacketHeaderBase,
  PacketBase,
  PacketMotionExData,
  PacketMotionData,
  MotionData,
  PacketSessionHistoryData,
  LapHistoryData,
  LapData,
  PacketParticipantsData,
  ParticipantData,
  PacketLapData,
  PacketLapPositionsData,
  CarDamageData,
  CarSetupData,
  CarTelemetryData,
  CarStatusData,
  CarPerformanceStatus,
  AssistStatus,
  ButtonEvent,
  ButtonEventDetails,
  CollisionEventDetails,
  CollisionEvent,
  PacketCarSetupData,
  PacketCarStatusData,
  PacketCarDamageData,
  PacketCarTelemetryData,
  CustomSetupStatus,
  LightEventDetails,
  LightEvent,
  FlashbackEventDetails,
  FlashbackEvent,
  OvertakeEventDetails,
  OvertakeEvent,
  PenaltyEventDetails,
  PenaltyEvent,
  VehicleEventDetails,
  VehicleEvent,
  RetirementEventDetails,
  RetirementEvent,
  DRSDisabledEventDetails,
  DRSDisabledEvent,
  DRSDisabledReason,
  FastestLapEventDetails,
  FastestLapEvent,
  DRSAllowed,
  GenericEvent,
  FaultStatus,
  PacketTimeTrialData,
  FinalClassificationData,
  PacketFinalClassificationData,
  PacketEvent,
  PacketLobbyInfoData,
  LobbyInfoData,
  TimeTrialDataSet,
  TyreSetData,
  PacketTyreSetsData,
  ActualTyreCompound,
  FuelMix,
  SafetyCarEventDetails,
  SafetyCarEvent,
  SafetyCarEventType,
  SafetyCarType,
  StopGoPenaltyServedEventDetails,
  StopAndGoEvent,
  AntiLockBrakes,
  ERSDeployMode,
  LiveryColour,
  MarshalZone,
  VisualTyreCompound,
  NetworkPaused,
  OnlineNamesStatus,
  ReadyStatus,
  ResultReason,
  ResultStatus,
  PitLimiterStatus,
  SpeedTrapEvent,
  SpeedTrapEventDetails,
  TelemetryStatus,
  TyreStintsHistoryData,
  RetirementReason,
  ValidationStatus,
  Platform,
  VehicleFIAFlags,
  TractionControl,
  WeatherForecastSample,
} from './parserTypes'

export {
  Driver,
  Tyre,
  PacketTypes,
  Team,
  Position,
  SessionTypes,
  Track,
  PacketSize
} from './constantTypes'
