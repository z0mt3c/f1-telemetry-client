import { F1Parser } from '../F1Parser'
import type { MotionData } from '../../types'

export class CarMotionDataParser extends F1Parser<MotionData> {
  constructor(packetFormat: number) {
    super()
    this.floatle('m_worldPositionX')
      .floatle('m_worldPositionY')
      .floatle('m_worldPositionZ')
      .floatle('m_worldVelocityX')
      .floatle('m_worldVelocityY')
      .floatle('m_worldVelocityZ')
      .int16le('m_worldForwardDirX')
      .int16le('m_worldForwardDirY')
      .int16le('m_worldForwardDirZ')
      .int16le('m_worldRightDirX')
      .int16le('m_worldRightDirY')
      .int16le('m_worldRightDirZ')

    if (packetFormat >= 2026) {
      // Quantised G-forces: divide raw int16 by 1000.0 to get the float value.
      this.int16le('m_gForceLateral').int16le('m_gForceLongitudinal').int16le('m_gForceVertical')
    } else {
      this.floatle('m_gForceLateral').floatle('m_gForceLongitudinal').floatle('m_gForceVertical')
    }

    this.floatle('m_yaw').floatle('m_pitch').floatle('m_roll')
  }
}
