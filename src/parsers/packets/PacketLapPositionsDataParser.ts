import { F1Parser } from '../F1Parser'
import { PacketHeaderParser } from './PacketHeaderParser'
import type { PacketLobbyInfoData } from './types'
import { Parser } from 'binary-parser'

export class PacketLapPositionsDataParser extends F1Parser<PacketLobbyInfoData> {
  data: PacketLobbyInfoData

  constructor (buffer: Buffer, packetFormat: number, bigintEnabled: boolean, laps: number) {
    super()

    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(packetFormat, bigintEnabled)
      })
      .uint8('m_numLaps')
      .uint8('m_lapStart')
      .array('m_positionForVehicleIdx', {
        length: laps,
        type: new Parser().array('cars', { length: 22, type: 'uint8' })
      })

    this.data = this.fromBuffer(buffer)
  }
}
