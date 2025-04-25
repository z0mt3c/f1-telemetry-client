import { F1Parser } from '../F1Parser'
import type { LobbyInfoData } from '../../types/parserTypes'

export class LobbyInfoDataParser extends F1Parser<LobbyInfoData> {
  constructor(packetFormat: number) {
    super()
    this.uint8('m_aiControlled').uint8('m_teamId').uint8('m_nationality')

    if (packetFormat >= 2023) {
      this.uint8('m_platform')
    }

    const nameLength = packetFormat >= 2025 ? 32 : 48
    this.string('m_name', { length: nameLength, stripNull: true })

    if (packetFormat >= 2021) {
      this.uint8('m_carNumber')
    }

    if (packetFormat >= 2024) {
      this.uint8('m_yourTelemetry')
      this.uint8('m_showOnlineNames')
      this.uint16le('m_techLevel')
    }

    this.uint8('m_readyStatus')
  }
}
