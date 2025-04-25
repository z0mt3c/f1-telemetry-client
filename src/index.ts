import * as dgram from 'dgram'
import { EventEmitter } from 'events'

import {
  PacketCarDamageDataParser,
  PacketCarSetupDataParser,
  PacketCarStatusDataParser,
  PacketCarTelemetryDataParser,
  PacketEventDataParser,
  PacketFinalClassificationDataParser,
  PacketFormatParser,
  PacketHeaderParser,
  PacketLapDataParser,
  PacketLobbyInfoDataParser,
  PacketMotionDataParser,
  PacketParticipantsDataParser,
  PacketSessionDataParser,
  PacketSessionHistoryDataParser,
} from './parsers/packets'
import { type Address, type Options, type PacketData, type ParsedMessage, ParserError } from './types'
import { PacketTyreSetsDataParser } from './parsers/packets/PacketTyreSetsDataParser'
import { PacketMotionExDataParser } from './parsers/packets/PacketMotionExDataParser'
import type { PacketHeader } from './types'
import type { RemoteInfo } from 'node:dgram'
import { PacketTimeTrialDataParser } from './parsers/packets/PacketTimeTrialDataParser'
import { PacketLapPositionsDataParser } from './parsers/packets/PacketLapPositionsDataParser'
import { PACKET_SIZES, PACKET_ID_TO_PACKET, PACKETS } from './constants'

export const DEFAULT_PORT = 20777
export const FORWARD_ADDRESSES = undefined
export const BIGINT_ENABLED = true

/**
 *
 */
export class F1TelemetryClient extends EventEmitter {
  port: number
  bigintEnabled: boolean
  forwardAddresses?: Address[]
  socket?: dgram.Socket

  constructor(opts: Options = {}) {
    super()

    const { port = DEFAULT_PORT, bigintEnabled = BIGINT_ENABLED, forwardAddresses = FORWARD_ADDRESSES } = opts

    this.port = port
    this.bigintEnabled = bigintEnabled
    this.forwardAddresses = forwardAddresses
    this.socket = dgram.createSocket('udp4')
  }

  /**
   *
   * @param {Buffer} message
   * @param bigintEnabled
   * @param remoteInfo
   */
  static parseBufferMessage(message: Buffer, bigintEnabled = false, remoteInfo?: RemoteInfo): ParsedMessage<PacketData> | undefined {
    const packetHeader = F1TelemetryClient.parsePacketHeader(message, bigintEnabled)
    const { m_packetFormat: format, m_packetId: id, m_gameYear: year } = packetHeader
    const context = { id, year, format, message, remoteInfo, name: 'unknown', data: packetHeader }
    const Parser = F1TelemetryClient.getParserByPacketId(id)

    if (Parser == null) throw new ParserError('No parser available', undefined, context)
    context.name = Object.keys(PACKETS)[id]
    try {
      const { data } = new Parser(message, format, bigintEnabled)
      return { ...context, data }
    } catch (error) {
      throw new ParserError('Parsing failed', error, context)
    }
  }

  /**
   *
   * @param {Buffer} buffer
   * @param {Boolean} bigintEnabled
   */
  static parsePacketHeader(buffer: Buffer, bigintEnabled: boolean): PacketHeader {
    const packetFormatParser = new PacketFormatParser()
    const { m_packetFormat } = packetFormatParser.fromBuffer(buffer)
    const packetHeaderParser = new PacketHeaderParser(m_packetFormat, bigintEnabled)
    return packetHeaderParser.fromBuffer(buffer)
  }

  /**
   *
   * @param {Number} packetFormat
   * @param {Number} packetId
   */
  static getPacketSize(packetFormat: number, packetId: number): number {
    const packetValues = Object.values(PACKET_SIZES)
    return packetValues[packetId][packetFormat]
  }

  /**
   *
   * @param {Number} packetId
   */
  static getParserByPacketId(packetId: number): any {
    const packetType = PACKET_ID_TO_PACKET[packetId]

    switch (packetType) {
      case PACKETS.session:
        return PacketSessionDataParser

      case PACKETS.motion:
        return PacketMotionDataParser

      case PACKETS.lapData:
        return PacketLapDataParser

      case PACKETS.event:
        return PacketEventDataParser

      case PACKETS.participants:
        return PacketParticipantsDataParser

      case PACKETS.carSetups:
        return PacketCarSetupDataParser

      case PACKETS.carTelemetry:
        return PacketCarTelemetryDataParser

      case PACKETS.carStatus:
        return PacketCarStatusDataParser

      case PACKETS.finalClassification:
        return PacketFinalClassificationDataParser

      case PACKETS.lobbyInfo:
        return PacketLobbyInfoDataParser

      case PACKETS.carDamage:
        return PacketCarDamageDataParser

      case PACKETS.sessionHistory:
        return PacketSessionHistoryDataParser

      case PACKETS.tyreSets:
        return PacketTyreSetsDataParser

      case PACKETS.motionEx:
        return PacketMotionExDataParser

      case PACKETS.timeTrial:
        return PacketTimeTrialDataParser

      case PACKETS.lapPositions:
        return PacketLapPositionsDataParser

      default:
        return null
    }
  }

  /**
   *
   * @param {Buffer} message
   * @param remoteInfo
   */
  handleMessage(message: Buffer, remoteInfo: RemoteInfo): void {
    if (this.forwardAddresses != null) {
      // bridge message
      this.bridgeMessage(message)
    }

    try {
      const parsedMessage = F1TelemetryClient.parseBufferMessage(message, this.bigintEnabled, remoteInfo)

      this.emitPackage(parsedMessage)
    } catch (error) {
      this.emit('error', error)
      if (error instanceof ParserError) this.emit('*', error.context)
    }
  }

  private emitPackage(parsedMessage?: ParsedMessage<PacketData>): void {
    if (parsedMessage?.data == null) return
    this.emit(parsedMessage.name + ':raw', parsedMessage)
    this.emit(parsedMessage.name, parsedMessage.data)
    this.emit('*', parsedMessage)
  }

  /**
   *
   * @param {Buffer} message
   */
  bridgeMessage(message: Buffer): void {
    if (this.socket == null) {
      throw new Error('Socket is not initialized')
    }
    if (this.forwardAddresses == null) {
      throw new Error('No ports to bridge over')
    }
    for (const address of this.forwardAddresses) {
      this.socket.send(message, 0, message.length, address.port, address.ip ?? '0.0.0.0')
    }
  }

  /**
   * Method to start listening for packets
   */
  start(): void {
    if (this.socket == null) {
      return
    }

    this.socket.on('listening', () => {
      if (this.socket == null) {
        return
      }

      const address = this.socket.address()
      console.log(`UDP Client listening on ${address.address}:${address.port} 🏎`)
      this.socket.setBroadcast(true)
    })

    this.socket.on('message', (m: Buffer, remoteInfo: RemoteInfo) => {
      this.handleMessage(m, remoteInfo)
    })
    this.socket.bind({
      port: this.port,
      exclusive: false,
    })
  }

  /**
   * Method to close the client
   */
  stop(): dgram.Socket | undefined {
    if (this.socket == null) {
      return
    }

    return this.socket.close(() => {
      console.log('UDP Client closed 🏁')
      this.socket = undefined
    })
  }
}

export * from './types'
export * from './constants'

export {
  SESSION_TYPES,
  TRACKS,
  TYRES,
  VISUAL_TYRES,
  PACKETS,
  PACKET_ID_TO_PACKET,
  PIT_STATUS,
  PACKET_SIZES,
  PENALTIES,
  RULESETS,
  SAFETY_CAR_STATUSES,
  SESSION_TYPES_UNTIL_2023,
  SESSION_LENGTH,
  SURFACES,
  TEAMS,
  ERAS,
  ERS_DEPLOY_MODE,
  ERS_DEPLOY_MODE_2019,
  EVENT_CODES,
  FORMULAS,
  FUEL_MIX,
  GAME_MODES,
  INFRINGEMENTS,
  NATIONALITIES,
  DRIVERS,
  GEARBOX,
  RACING_LINE,
  RACING_LINE_TYPE,
  TRACKING_CONTROL,
  BUTTON_FLAGS,
  LAP_VALID_FLAGS,
  RESULT_STATUS,
  WEATHER,
  WHEEL_POSITIONS,
} from './constants'
export {
  PacketHeader,
  ParserError,
  Address,
  PacketData,
  PacketSessionData,
  Packet,
  EventCode,
  ParsedMessage,
  Options,
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
  Driver,
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
  PacketSize,
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
  Tyre,
  PacketTypes,
  ActualTyreCompound,
  FuelMix,
  SafetyCarEventDetails,
  SafetyCarEvent,
  SafetyCarEventType,
  SafetyCarType,
  Team,
  StopGoPenaltyServedEventDetails,
  StopAndGoEvent,
  AntiLockBrakes,
  ERSDeployMode,
  LiveryColour,
  Position,
  MarshalZone,
  VisualTyreCompound,
  NetworkPaused,
  OnlineNamesStatus,
  ReadyStatus,
  ResultReason,
  ResultStatus,
  PitLimiterStatus,
  SessionTypes,
  SpeedTrapEvent,
  SpeedTrapEventDetails,
  TelemetryStatus,
  Track,
  TyreStintsHistoryData,
  RetirementReason,
  ValidationStatus,
  Platform,
  VehicleFIAFlags,
  TractionControl,
  WeatherForecastSample,
} from './types'

export default F1TelemetryClient
