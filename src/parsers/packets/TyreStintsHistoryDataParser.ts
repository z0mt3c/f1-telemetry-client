import { F1Parser } from '../F1Parser'
import type { TyreStintsHistoryData } from '../../types/parserTypes'

export class TyreStintsHistoryDataParser extends F1Parser<TyreStintsHistoryData> {
  constructor () {
    super()
    this.endianess('little')
      .uint8('m_endLap')
      .uint8('m_tyreActualCompound')
      .uint8('m_tyreVisualCompound')
  }
}
