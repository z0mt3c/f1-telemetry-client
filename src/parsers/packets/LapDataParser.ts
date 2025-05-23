import { F1Parser } from '../F1Parser'
import type { LapData } from '../../types'

export class LapDataParser extends F1Parser<LapData> {
  constructor(packetFormat: number) {
    super()

    this.endianess('little')

    if (packetFormat >= 2021) {
      this.uint32le('m_lastLapTimeInMS').uint32le('m_currentLapTimeInMS')
    } else {
      this.floatle('m_lastLapTime').floatle('m_currentLapTime')
    }

    if (packetFormat >= 2020) this.uint16le('m_sector1TimeInMS')
    if (packetFormat >= 2023) this.uint8('m_sector1TimeMinutes')
    if (packetFormat >= 2020) this.uint16le('m_sector2TimeInMS')

    if (packetFormat >= 2023) {
      this.uint8('m_sector2TimeMinutes')
      this.uint16le('m_deltaToCarInFrontInMS')
      if (packetFormat >= 2024) this.uint8('m_deltaToCarInFrontMinutes')
      this.uint16le('m_deltaToRaceLeaderInMS')
      if (packetFormat >= 2024) this.uint8('m_deltaToRaceLeaderMinutes')
    }

    if (packetFormat >= 2018 && packetFormat <= 2020) {
      this.floatle('m_bestLapTime')
    }

    if (packetFormat === 2018 || packetFormat === 2019) {
      this.floatle('m_sector1Time').floatle('m_sector2Time')
    }

    if (packetFormat === 2020) {
      this.uint8('m_bestLapNum')
        .uint16le('m_bestLapSector1TimeInMS')
        .uint16le('m_bestLapSector2TimeInMS')
        .uint16le('m_bestLapSector3TimeInMS')
        .uint16le('m_bestOverallSector1TimeInMS')
        .uint8('m_bestOverallSector1LapNum')
        .uint16le('m_bestOverallSector2TimeInMS')
        .uint8('m_bestOverallSector2LapNum')
        .uint16le('m_bestOverallSector3TimeInMS')
        .uint8('m_bestOverallSector3LapNum')
    }

    this.floatle('m_lapDistance').floatle('m_totalDistance').floatle('m_safetyCarDelta').uint8('m_carPosition').uint8('m_currentLapNum').uint8('m_pitStatus')

    if (packetFormat >= 2021) {
      this.uint8('m_numPitStops')
    }

    this.uint8('m_sector').uint8('m_currentLapInvalid').uint8('m_penalties')

    if (packetFormat === 2021 || packetFormat === 2022) {
      this.uint8('m_warnings')
    }

    if (packetFormat >= 2023) {
      this.uint8('m_totalWarnings').uint8('m_cornerCuttingWarnings')
    }

    if (packetFormat >= 2021) {
      this.uint8('m_numUnservedDriveThroughPens').uint8('m_numUnservedStopGoPens')
    }

    this.uint8('m_gridPosition').uint8('m_driverStatus').uint8('m_resultStatus')

    if (packetFormat >= 2021) {
      this.uint8('m_pitLaneTimerActive').uint16le('m_pitLaneTimeInLaneInMS').uint16le('m_pitStopTimerInMS').uint8('m_pitStopShouldServePen')
    }

    if (packetFormat >= 2024) {
      this.floatle('m_speedTrapFastestSpeed').uint8('m_speedTrapFastestLap')
    }
  }
}
