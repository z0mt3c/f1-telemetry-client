import { F1Parser } from '../F1Parser'
import type { TyreSetData } from '../../types/parserTypes'

export class TyreSetDataParser extends F1Parser<TyreSetData> {
  constructor () {
    super()

    this.endianess('little')
      .uint8('m_actualTyreCompound')
      .uint8('m_visualTyreCompound')
      .uint8('m_wear')
      .uint8('m_available')
      .uint8('m_recommendedSession')
      .uint8('m_lifeSpan')
      .uint8('m_usableLife')
      .int16('m_lapDeltaTime')
      .uint8('m_fitted')
  }
}
