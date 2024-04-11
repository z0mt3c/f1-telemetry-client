import { F1Parser } from '../F1Parser'
import type { LobbyInfoData } from './types'

export class LobbyInfoDataParser extends F1Parser<LobbyInfoData> {
  constructor (packetFormat: number) {
    super()
    this.uint8('m_aiControlled').uint8('m_teamId').uint8('m_nationality')

    if (packetFormat >= 2023) {
      this.uint8('m_platform')
    }

    this.string('m_name', { length: 48, stripNull: true })

    if (packetFormat >= 2021) {
      this.uint8('m_carNumber')
    }

    if (packetFormat >= 2024) {
      this.uint8('m_yourTelemetry').uint8('m_showOnlineNames').uint8('m_techLevel')
    }

    this.uint8('m_readyStatus')
  }
}
