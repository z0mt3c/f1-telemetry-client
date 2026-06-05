import { F1Parser } from '../F1Parser'
import { CarStatusDataParser } from './CarStatusDataParser'
import { PacketHeaderParser } from './PacketHeaderParser'
import type { PacketCarStatusData } from '../../types'
import { carCount } from '../../constants/cars'

export class PacketCarStatusDataParser extends F1Parser<PacketCarStatusData> {
  data: PacketCarStatusData

  constructor(buffer: Buffer, packetFormat: number, bigintEnabled: boolean) {
    super()

    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(packetFormat, bigintEnabled),
      })
      .array('m_carStatusData', {
        length: carCount(packetFormat),
        type: new CarStatusDataParser(packetFormat),
      })

    this.data = this.fromBuffer(buffer)
  }
}
