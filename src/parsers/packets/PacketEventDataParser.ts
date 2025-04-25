import { Parser } from 'binary-parser'

import { F1Parser } from '../F1Parser'

import { PacketHeaderParser } from './PacketHeaderParser'
import {
  type ButtonEventDetails,
  type FastestLapEventDetails,
  type FlashbackEventDetails,
  type VehicleEventDetails,
  type LightEventDetails,
  type OvertakeEventDetails,
  type PenaltyEventDetails,
  type SpeedTrapEventDetails,
  type PacketEvent,
  type GenericEvent,
  type SafetyCarEventDetails,
  type CollisionEventDetails,
  type StopGoPenaltyServedEventDetails,
  type DRSDisabledEventDetails,
  type RetirementEventDetails,
  EventCode,
} from '../../types/parserTypes'

export class VehicleEventParser extends F1Parser<VehicleEventDetails> {
  static VEHICLE_EVENT_CODES: EventCode[] = [EventCode.Retirement, EventCode.TeamMateInPits, EventCode.RaceWinner, EventCode.DriveThroughServed, EventCode.StopGoServed]

  constructor() {
    super()
    this.endianess('little').uint8('vehicleIdx')
  }
}

export class FastestLapParser extends F1Parser<FastestLapEventDetails> {
  constructor() {
    super()
    this.endianess('little').uint8('vehicleIdx').floatle('lapTime')
  }
}

export class FlashbackParser extends F1Parser<FlashbackEventDetails> {
  constructor() {
    super()
    this.endianess('little').uint32le('flashbackFrameIdentifier').floatle('flashbackSessionTime')
  }
}

export class SafetyCarParser extends F1Parser<SafetyCarEventDetails> {
  constructor() {
    super()
    this.endianess('little').uint8('safetyCarType').uint8('eventType')
  }
}

export class CollisionParser extends F1Parser<CollisionEventDetails> {
  constructor() {
    super()
    this.endianess('little').uint8('vehicle1Idx').uint8('vehicle2Idx')
  }
}

export class StartLightsParser extends F1Parser<LightEventDetails> {
  constructor() {
    super()

    this.endianess('little').uint8('numLights')
  }
}

export class ButtonsParser extends F1Parser<ButtonEventDetails> {
  constructor() {
    super()

    this.endianess('little').uint32le('buttonStatus')
  }
}

export class OvertakeParser extends F1Parser<OvertakeEventDetails> {
  constructor() {
    super()

    this.endianess('little').uint8('overtakingVehicleIdx').uint8('beingOvertakenVehicleIdx')
  }
}

export class DRSDisabledParser extends F1Parser<DRSDisabledEventDetails> {
  constructor(format: number) {
    super()

    this.endianess('little').uint8('reason')
  }
}

export class RetirementParser extends F1Parser<RetirementEventDetails> {
  constructor(format: number) {
    super()

    this.endianess('little').uint8('vehicleIdx').uint8('reason')
  }
}

export class StopGoParser extends F1Parser<StopGoPenaltyServedEventDetails> {
  constructor(format: number) {
    super()

    this.endianess('little').uint8('vehicleIdx').floatle('stopTime')
  }
}

export class SpeedTrapParser extends F1Parser<SpeedTrapEventDetails> {
  constructor(packetFormat: number) {
    super()

    this.endianess('little').uint8('vehicleIdx').floatle('speed')

    if (packetFormat === 2021) {
      this.uint8('overallFastestInSession').uint8('driverFastestInSession')
    }

    if (packetFormat >= 2022) {
      this.uint8('isOverallFastestInSession').uint8('isDriverFastestInSession').uint8('fastestVehicleIdxInSession').floatle('fastestSpeedInSession')
    }
  }
}

export class PenaltyParser extends F1Parser<PenaltyEventDetails> {
  constructor() {
    super()

    this.endianess('little').uint8('penaltyType').uint8('infringementType').uint8('vehicleIdx').uint8('otherVehicleIdx').uint8('time').uint8('lapNum').uint8('placesGained')
  }
}

export class PacketEventDataParser extends F1Parser<PacketEvent> {
  data: PacketEvent

  constructor(buffer: Buffer, packetFormat: number, bigintEnabled: boolean) {
    super()

    this.endianess('little').nest('m_header', {
      type: new PacketHeaderParser(packetFormat, bigintEnabled),
    })

    this.string('m_eventStringCode', { length: 4 })

    const eventStringCode = this.getEventStringCode(buffer, packetFormat, bigintEnabled)

    if (eventStringCode === EventCode.FastestLap) {
      this.nest('m_eventDetails', { type: new FastestLapParser() })
    } else if (eventStringCode === EventCode.SpeedTrap) {
      this.nest('m_eventDetails', { type: new SpeedTrapParser(packetFormat) })
    } else if (eventStringCode === EventCode.Penalty) {
      this.nest('m_eventDetails', { type: new PenaltyParser() })
    } else if (eventStringCode === EventCode.Flashback) {
      this.nest('m_eventDetails', { type: new FlashbackParser() })
    } else if (eventStringCode === EventCode.StartLights) {
      this.nest('m_eventDetails', { type: new StartLightsParser() })
    } else if (eventStringCode === EventCode.ButtonStatus) {
      this.nest('m_eventDetails', { type: new ButtonsParser() })
    } else if (eventStringCode === EventCode.Overtake) {
      this.nest('m_eventDetails', { type: new OvertakeParser() })
    } else if (eventStringCode === EventCode.Retirement) {
      if (packetFormat >= 2025) this.nest('m_eventDetails', { type: new RetirementParser(packetFormat) })
    } else if (eventStringCode === EventCode.DRSDisabled) {
      if (packetFormat >= 2025) this.nest('m_eventDetails', { type: new DRSDisabledParser(packetFormat) })
    } else if (eventStringCode === EventCode.StopGoServed) {
      if (packetFormat >= 2025) this.nest('m_eventDetails', { type: new StopGoParser(packetFormat) })
    } else if (eventStringCode === EventCode.SafetyCar) {
      this.nest('m_eventDetails', { type: new SafetyCarParser() })
    } else if (eventStringCode === EventCode.Collision) {
      this.nest('m_eventDetails', { type: new CollisionParser() })
    } else if (VehicleEventParser.VEHICLE_EVENT_CODES.includes(eventStringCode)) {
      this.nest('m_eventDetails', { type: new VehicleEventParser() })
    }

    this.data = this.fromBuffer(buffer)
  }

  getEventStringCode = (buffer: Buffer, packetFormat: number, bigintEnabled: boolean): EventCode => {
    const headerParser = new Parser()
      .endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(packetFormat, bigintEnabled),
      })
      .string('m_eventStringCode', { length: 4 })
    const { m_eventStringCode } = headerParser.parse(buffer) as GenericEvent
    return m_eventStringCode
  }
}
