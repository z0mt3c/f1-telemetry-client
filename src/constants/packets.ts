export enum PACKETS {
  motion = 'motion',
  session = 'session',
  lapData = 'lapData',
  event = 'event',
  participants = 'participants',
  carSetups = 'carSetups',
  carTelemetry = 'carTelemetry',
  carStatus = 'carStatus',
  finalClassification = 'finalClassification',
  lobbyInfo = 'lobbyInfo',
  carDamage = 'carDamage',
  sessionHistory = 'sessionHistory',
  tyreSets = 'tyreSets',
  motionEx = 'motionEx',
  timeTrial = 'timeTrial',
  lapPositions = 'lapPositions',
}

// Example order of packets in the telemetry stream:
// - 1, 5, 10, 12, 2, 0, 13, 6, 7
// - 10, 12, 2, 0, 13, 6, 7
// - 12, 2, 0, 13, 6, 7

export const PACKET_ID_TO_PACKET: Record<number, PACKETS> = {
  0: PACKETS.motion,
  1: PACKETS.session,
  2: PACKETS.lapData,
  3: PACKETS.event,
  4: PACKETS.participants,
  5: PACKETS.carSetups,
  6: PACKETS.carTelemetry,
  7: PACKETS.carStatus,
  8: PACKETS.finalClassification,
  9: PACKETS.lobbyInfo,
  10: PACKETS.carDamage,
  11: PACKETS.sessionHistory,
  12: PACKETS.tyreSets,
  13: PACKETS.motionEx,
  14: PACKETS.timeTrial,
  15: PACKETS.lapPositions,
}
