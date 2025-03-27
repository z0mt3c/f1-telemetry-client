import { F1Parser } from '../F1Parser'
import type { ParticipantData } from './types'

export class ParticipantDataParser extends F1Parser<ParticipantData> {
  constructor (packetFormat: number) {
    super()

    this.uint8('m_aiControlled')
      .uint8('m_driverId')

    if (packetFormat >= 2021) {
      this.uint8('m_networkId')
    }

    this.uint8('m_teamId')

    if (packetFormat >= 2021) {
      this.uint8('m_myTeam')
    }

    const nameLength = packetFormat >= 2025 ? 32 : 48
    this.uint8('m_raceNumber')
      .uint8('m_nationality')
      .string('m_name', {
        length: nameLength,
        stripNull: true
      })

    if (packetFormat >= 2019) this.uint8('m_yourTelemetry')
    if (packetFormat >= 2023) this.uint8('m_showOnlineNames')
    if (packetFormat >= 2024) this.uint16le('m_techLevel')
    if (packetFormat >= 2023) this.uint8('m_platform')
    if (packetFormat >= 2025) this.uint8('h_unknown')
    if (packetFormat >= 2025) this.buffer('m_remaining', { length: 12 })
  }
}
