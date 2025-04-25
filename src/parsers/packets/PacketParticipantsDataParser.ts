import { F1Parser } from '../F1Parser'

import { PacketHeaderParser } from './PacketHeaderParser'
import { ParticipantDataParser } from './ParticipantDataParser'
import type { PacketParticipantsData } from '../../types/parserTypes'

export class PacketParticipantsDataParser extends F1Parser<PacketParticipantsData> {
  data: PacketParticipantsData

  constructor (buffer: Buffer, packetFormat: number, bigintEnabled: boolean) {
    super()

    this.endianess('little').nest('m_header', {
      type: new PacketHeaderParser(packetFormat, bigintEnabled)
    })

    if (packetFormat === 2018) {
      this.uint8('m_numCars')
    }

    if (packetFormat >= 2019) {
      this.uint8('m_numActiveCars')
    }

    const length = packetFormat >= 2020 ? 22 : 20
    this.array('m_participants', {
      length,
      type: new ParticipantDataParser(packetFormat)
    })

    this.data = this.fromBuffer(buffer)
  }
}
