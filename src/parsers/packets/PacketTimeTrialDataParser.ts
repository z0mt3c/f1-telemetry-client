import { F1Parser } from '../F1Parser'

import { PacketHeaderParser } from './PacketHeaderParser'
import type { PacketTimeTrialData, TimeTrialDataSet } from './types'

class TimeTrialDataSetParser extends F1Parser<TimeTrialDataSet> {
  constructor () {
    super()
    this.uint8('m_carIdx')
      .uint8('m_teamId')
      .uint32('m_lapTimeInMS')
      .uint32('m_sector1TimeInMS')
      .uint32('m_sector2TimeInMS')
      .uint32('m_sector3TimeInMS')
      .uint8('m_tractionControl')
      .uint8('m_gearboxAssist')
      .uint8('m_antiLockBrakes')
      .uint8('m_equalCarPerformance')
      .uint8('m_customSetup')
      .uint8('m_valid')
  }
}
export class PacketTimeTrialDataParser extends F1Parser<PacketTimeTrialData> {
  data: PacketTimeTrialData

  constructor (buffer: Buffer, packetFormat: number, bigintEnabled: boolean) {
    super()
    this.endianess('little')
      .nest('m_header', { type: new PacketHeaderParser(packetFormat, bigintEnabled) })
      .nest('m_playerSessionBestDataSet', { type: new TimeTrialDataSetParser() })
      .nest('m_personalBestDataSet', { type: new TimeTrialDataSetParser() })
      .nest('m_rivalDataSet', { type: new TimeTrialDataSetParser() })

    this.data = this.fromBuffer(buffer)
  }
}
