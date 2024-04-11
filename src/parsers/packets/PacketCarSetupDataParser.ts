import { F1Parser } from '../F1Parser'
import { CarSetupDataParser } from './CarSetupDataParser'
import { PacketHeaderParser } from './PacketHeaderParser'
import type { PacketCarSetupData } from './types'

export class PacketCarSetupDataParser extends F1Parser<PacketCarSetupData> {
  data: PacketCarSetupData

  constructor (buffer: Buffer, packetFormat: number, bigintEnabled: boolean) {
    super()

    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(packetFormat, bigintEnabled)
      })
      .array('m_carSetups', {
        length: packetFormat >= 2020 ? 22 : 20,
        type: new CarSetupDataParser(packetFormat)
      })

    if (packetFormat >= 2024) {
      this.floatle('m_nextFrontWingValue')
    }

    this.data = this.fromBuffer(buffer)
  }
}
