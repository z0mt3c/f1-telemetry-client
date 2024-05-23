import { F1Parser } from '../F1Parser'
import { LapDataParser } from './LapDataParser'
import { PacketHeaderParser } from './PacketHeaderParser'
import type { PacketLapData } from './types'

export class PacketLapDataParser extends F1Parser<PacketLapData> {
  data: PacketLapData

  constructor (buffer: Buffer, packetFormat: number, bigintEnabled: boolean) {
    super()

    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(packetFormat, bigintEnabled)
      })
      .array('m_lapData', {
        length: packetFormat >= 2020 ? 22 : 20,
        type: new LapDataParser(packetFormat)
      })
    if (packetFormat >= 2022) {
      this.uint8('m_timeTrialPBCarIdx').uint8('m_timeTrialRivalCarIdx')
    }

    this.data = this.postProcess(this.fromBuffer(buffer))
  }

  private postProcess (packetLapData: PacketLapData): PacketLapData {
    packetLapData.m_lapData.forEach(lap => {
      if (lap.m_sector1TimeMinutes != null && lap.m_sector1TimeInMS != null && lap.m_sector1TimeMinutes > 0) {
        lap.m_sector1TimeInMS += lap.m_sector1TimeMinutes * 60 * 1000
        lap.m_sector1TimeMinutes = undefined
      }

      if (lap.m_sector2TimeMinutes != null && lap.m_sector2TimeInMS != null && lap.m_sector2TimeMinutes > 0) {
        lap.m_sector2TimeInMS += lap.m_sector2TimeMinutes * 60 * 1000
        lap.m_sector2TimeMinutes = undefined
      }

      if (lap.m_deltaToRaceLeaderMinutes != null && lap.m_deltaToRaceLeaderInMS != null && lap.m_deltaToRaceLeaderMinutes > 0) {
        lap.m_deltaToRaceLeaderInMS += lap.m_deltaToRaceLeaderMinutes * 60 * 1000
        lap.m_deltaToRaceLeaderMinutes = undefined
      }

      if (lap.m_deltaToCarInFrontMinutes != null && lap.m_deltaToCarInFrontInMS != null && lap.m_deltaToCarInFrontMinutes > 0) {
        lap.m_deltaToCarInFrontInMS += lap.m_deltaToCarInFrontMinutes * 60 * 1000
        lap.m_deltaToCarInFrontMinutes = undefined
      }
    })

    return packetLapData
  }
}
