import { F1Parser } from '../F1Parser'
import type { MarshalZone } from '../../types/parserTypes'

export class MarshalZoneParser extends F1Parser<MarshalZone> {
  constructor () {
    super()
    this.endianess('little').floatle('m_zoneStart').int8('m_zoneFlag')
  }
}
