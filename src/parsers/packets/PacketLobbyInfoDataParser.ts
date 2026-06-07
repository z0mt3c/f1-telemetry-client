import { F1Parser } from '../F1Parser'
import { LobbyInfoDataParser } from './LobbyInfoDataParser'
import { PacketHeaderParser } from './PacketHeaderParser'
import type { PacketLobbyInfoData } from '../../types'
import { carCount } from '../../constants/cars'

export class PacketLobbyInfoDataParser extends F1Parser<PacketLobbyInfoData> {
  data: PacketLobbyInfoData

  constructor(buffer: Buffer, packetFormat: number, bigintEnabled: boolean) {
    super()

    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(packetFormat, bigintEnabled),
      })
      .uint8('m_numPlayers')
      .array('m_lobbyPlayers', {
        length: carCount(packetFormat),
        type: new LobbyInfoDataParser(packetFormat),
      })

    this.data = this.fromBuffer(buffer)
  }
}
