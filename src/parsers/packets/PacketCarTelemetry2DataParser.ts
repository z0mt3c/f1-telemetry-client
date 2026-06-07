import { F1Parser } from '../F1Parser'
import { carCount } from '../../constants/cars'
import { CarTelemetry2DataParser } from './CarTelemetry2DataParser'
import { PacketHeaderParser } from './PacketHeaderParser'
import type { PacketCarTelemetry2Data } from '../../types'

export class PacketCarTelemetry2DataParser extends F1Parser<PacketCarTelemetry2Data> {
  data: PacketCarTelemetry2Data

  constructor(buffer: Buffer, packetFormat: number, bigintEnabled: boolean) {
    super()

    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(packetFormat, bigintEnabled),
      })
      .array('m_carTelemetry2Data', {
        length: carCount(packetFormat),
        type: new CarTelemetry2DataParser(),
      })

    this.data = this.fromBuffer(buffer)
  }
}
