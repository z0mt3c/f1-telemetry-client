import * as dgram from 'dgram'
import { EventEmitter } from 'events'

import * as constants from './constants'
import * as constantsTypes from './constants/types'
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
  PacketSessionHistoryDataParser
} from './parsers/packets'
import * as packetTypes from './parsers/packets/types'
import type { Address, Options, ParsedMessage } from './types'
import { PacketTyreSetsDataParser } from './parsers/packets/PacketTyreSetsDataParser'
import { PacketMotionExDataParser } from './parsers/packets/PacketMotionExDataParser'
import type { PacketHeader } from './parsers/packets/types'
import { PacketTimeTrialDataParser } from './parsers/packets/PacketTimeTrialDataParser'

const DEFAULT_PORT = 20777
const FORWARD_ADDRESSES = undefined
const BIGINT_ENABLED = true

/**
 *
 */
class F1TelemetryClient extends EventEmitter {
  port: number
  bigintEnabled: boolean
  forwardAddresses?: Address[]
  socket?: dgram.Socket

  constructor (opts: Options = {}) {
    super()

    const {
      port = DEFAULT_PORT,
      bigintEnabled = BIGINT_ENABLED,
      forwardAddresses = FORWARD_ADDRESSES
    } = opts

    this.port = port
    this.bigintEnabled = bigintEnabled
    this.forwardAddresses = forwardAddresses
    this.socket = dgram.createSocket('udp4')
  }

  /**
   *
   * @param {Buffer} message
   * @param bigintEnabled
   */
  static parseBufferMessage (
    message: Buffer,
    bigintEnabled = false
  ): ParsedMessage | undefined {
    const { m_packetFormat, m_packetId } = F1TelemetryClient.parsePacketHeader(
      message,
      bigintEnabled
    )

    const Parser = F1TelemetryClient.getParserByPacketId(m_packetId)

    if (Parser == null) {
      return
    }

    const packetData = new Parser(message, m_packetFormat, bigintEnabled)
    const packetID = Object.keys(constants.PACKETS)[m_packetId]

    // emit parsed message
    return { packetData, packetID, message }
  }

  /**
   *
   * @param {Buffer} buffer
   * @param {Boolean} bigintEnabled
   */
  static parsePacketHeader (
    buffer: Buffer,
    bigintEnabled: boolean
  ): PacketHeader {
    const packetFormatParser = new PacketFormatParser()
    const { m_packetFormat } = packetFormatParser.fromBuffer(buffer)
    const packetHeaderParser = new PacketHeaderParser(
      m_packetFormat,
      bigintEnabled
    )
    return packetHeaderParser.fromBuffer(buffer)
  }

  /**
   *
   * @param {Number} packetFormat
   * @param {Number} packetId
   */
  static getPacketSize (packetFormat: number, packetId: number): number {
    const { PACKET_SIZES } = constants
    const packetValues = Object.values(PACKET_SIZES)
    return packetValues[packetId][packetFormat]
  }

  /**
   *
   * @param {Number} packetId
   */
  static getParserByPacketId (packetId: number): any {
    const { PACKETS } = constants

    const packetKeys = Object.keys(PACKETS)
    const packetType = packetKeys[packetId]

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

      default:
        return null
    }
  }

  /**
   *
   * @param {Buffer} message
   */
  handleMessage (message: Buffer): void {
    if (this.forwardAddresses != null) {
      // bridge message
      this.bridgeMessage(message)
    }

    const parsedMessage = F1TelemetryClient.parseBufferMessage(
      message,
      this.bigintEnabled
    )

    if ((parsedMessage == null) || (parsedMessage.packetData == null)) {
      return
    }

    // emit parsed message
    this.emit(parsedMessage.packetID, parsedMessage.packetData.data)
    this.emit('raw', parsedMessage)
  }

  /**
   *
   * @param {Buffer} message
   */
  bridgeMessage (message: Buffer): void {
    if (this.socket == null) {
      throw new Error('Socket is not initialized')
    }
    if (this.forwardAddresses == null) {
      throw new Error('No ports to bridge over')
    }
    for (const address of this.forwardAddresses) {
      this.socket.send(
        message,
        0,
        message.length,
        address.port,
        address.ip ?? '0.0.0.0'
      )
    }
  }

  /**
   * Method to start listening for packets
   */
  start (): void {
    if (this.socket == null) {
      return
    }

    this.socket.on('listening', () => {
      if (this.socket == null) {
        return
      }

      const address = this.socket.address()
      console.log(
        `UDP Client listening on ${address.address}:${address.port} 🏎`
      )
      this.socket.setBroadcast(true)
    })

    this.socket.on('message', m => { this.handleMessage(m) })
    this.socket.bind({
      port: this.port,
      exclusive: false
    })
  }

  /**
   * Method to close the client
   */
  stop (): dgram.Socket | undefined {
    if (this.socket == null) {
      return
    }

    return this.socket.close(() => {
      console.log('UDP Client closed 🏁')
      this.socket = undefined
    })
  }
}

export {
  F1TelemetryClient,
  constants,
  constantsTypes,
  packetTypes,
  DEFAULT_PORT,
  BIGINT_ENABLED,
  FORWARD_ADDRESSES
}
