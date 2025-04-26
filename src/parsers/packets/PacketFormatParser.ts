import { F1Parser } from '../F1Parser'
import type { PacketHeaderBase } from '../../types'

export class PacketFormatParser extends F1Parser<PacketHeaderBase> {
  constructor() {
    super()
    this.endianess('little').uint16le('m_packetFormat')
  }
}
