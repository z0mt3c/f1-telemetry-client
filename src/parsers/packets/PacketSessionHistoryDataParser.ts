import { F1Parser } from '../F1Parser'
import { LapHistoryDataParser } from './LapHistoryDataParser'
import { TyreStintsHistoryDataParser } from './TyreStintsHistoryDataParser'
import { PacketHeaderParser } from './PacketHeaderParser'
import type { PacketSessionHistoryData } from '../../types/parserTypes'

export class PacketSessionHistoryDataParser extends F1Parser<PacketSessionHistoryData> {
  data: PacketSessionHistoryData

  constructor (buffer: Buffer, packetFormat: number, bigintEnabled: boolean) {
    super()

    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(packetFormat, bigintEnabled)
      })
      .uint8('m_carIdx')
      .uint8('m_numLaps')
      .uint8('m_numTyreStints')
      .uint8('m_bestLapTimeLapNum')
      .uint8('m_bestSector1LapNum')
      .uint8('m_bestSector2LapNum')
      .uint8('m_bestSector3LapNum')
      .array('m_lapHistoryData', {
        length: 100,
        type: new LapHistoryDataParser(packetFormat)
      })
      .array('m_tyreStintsHistoryData', {
        length: 8,
        type: new TyreStintsHistoryDataParser()
      })

    this.data = this.postProcess(this.fromBuffer(buffer))
  }

  private postProcess (packetSessionHistoryData: PacketSessionHistoryData): PacketSessionHistoryData {
    packetSessionHistoryData.m_lapHistoryData.forEach(lap => {
      if (lap.m_sector1TimeMinutes != null && lap.m_sector1TimeInMS != null && lap.m_sector1TimeMinutes > 0) {
        lap.m_sector1TimeInMS += lap.m_sector1TimeMinutes * 60 * 1000
        lap.m_sector1TimeMinutes = undefined
      }

      if (lap.m_sector2TimeMinutes != null && lap.m_sector2TimeInMS != null && lap.m_sector2TimeMinutes > 0) {
        lap.m_sector2TimeInMS += lap.m_sector2TimeMinutes * 60 * 1000
        lap.m_sector2TimeMinutes = undefined
      }

      if (lap.m_sector3TimeMinutes != null && lap.m_sector3TimeInMS != null && lap.m_sector3TimeMinutes > 0) {
        lap.m_sector3TimeInMS += lap.m_sector3TimeMinutes * 60 * 1000
        lap.m_sector3TimeMinutes = undefined
      }
    })
    return packetSessionHistoryData
  }
}
