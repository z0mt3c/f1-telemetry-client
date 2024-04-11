import { F1Parser } from '../F1Parser'
import type { LapHistoryData } from './types'

export class LapHistoryDataParser extends F1Parser<LapHistoryData> {
  constructor (packetFormat: number) {
    super()

    this.endianess('little')
      .uint32('m_lapTimeInMS')
      .uint16('m_sector1TimeMSPart')

    if (packetFormat >= 2023) {
      this.uint8('m_sector1TimeMinutesPart')
    }

    this.uint16('m_sector2TimeMSPart')

    if (packetFormat >= 2023) {
      this.uint8('m_sector2TimeMinutesPart')
    }

    this.uint16('m_sector3TimeMSPart')

    if (packetFormat >= 2023) {
      this.uint8('m_sector3TimeMinutesPart')
    }

    this.uint8('m_lapValidBitFlags')
  }
}
