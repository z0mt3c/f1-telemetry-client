import { F1Parser } from '../F1Parser'
import { PacketHeaderParser } from './PacketHeaderParser'
import type { PacketLapPositionsData } from '../../types'
import { carCount } from '../../constants/cars'
import { Parser } from 'binary-parser'

export class PacketLapPositionsDataParser extends F1Parser<PacketLapPositionsData> {
  data: PacketLapPositionsData

  constructor(buffer: Buffer, packetFormat: number, bigintEnabled: boolean) {
    super()

    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(packetFormat, bigintEnabled),
      })
      .uint8('m_numLaps')
      .uint8('m_lapStart')
      .array('m_positionForVehicleIdx', {
        length: 50,
        type: new Parser().array('cars', { length: carCount(packetFormat), type: 'uint8' }),
      })

    this.data = this.fromBuffer(buffer)
  }
}
