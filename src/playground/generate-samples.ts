import { F1TelemetryClient } from '..'
import * as fs from 'fs'
import LineByLine from 'n-readlines'
import { PACKETS } from '../constants'
import { rimraf } from 'rimraf'
import { EventCode, type Packet } from '../parsers/packets/types'

const typeMapping: Record<string, string[]> = {
  motion: ['PacketMotionData'],
  session: ['PacketSessionData'],
  lapData: ['PacketLapData'],
  event: [
    'GenericEvent',
    'VehicleEvent',
    'LightEvent',
    'ButtonEvent',
    'OvertakeEvent',
    'PenaltyEvent',
    'FlashbackEvent',
    'SpeedTrapEvent',
    'FastestLapEvent',
    'SafetyCarEvent',
    'CollisionEvent',
    'DRSDisabledEvent',
    'RetirementEvent',
    'EventCode'
  ],
  participants: ['PacketParticipantsData'],
  carSetups: ['PacketCarSetupData'],
  carTelemetry: ['PacketCarTelemetryData'],
  carStatus: ['PacketCarStatusData'],
  finalClassification: ['PacketFinalClassificationData'],
  lobbyInfo: ['PacketLobbyInfoData'],
  carDamage: ['PacketCarDamageData'],
  sessionHistory: ['PacketSessionHistoryData'],
  tyreSets: ['PacketTyreSetsData'],
  motionEx: ['PacketMotionExData']
}

rimraf.rimrafSync('./src/samples')
fs.mkdir('./src/samples/', () => {})

const normalize = (v: unknown): any =>
  JSON.parse(
    JSON.stringify(v, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )
  )

 
const findKey = (types: any, value: any): string => Object.keys(types)[Object.values(types).indexOf(value)]

 
function writeTSFile (body: any, filename: string): void {
  const packet = Object.values(PACKETS)[body.m_header.m_packetId]
  const type = typeMapping[packet]
  fs.writeFileSync(
    `./src/samples/${filename}-${type.join('-')}.ts`,
    `import {${type.join(',')}} from '../parsers/packets/types';\nexport const SAMPLE: ${type.join(
      '|'
    )} = ${JSON.stringify(normalize(body), null, '  ')};`.replace(
      /"m_sessionUID": "([0-9]+)"/g,
      '"m_sessionUID": BigInt(\'$1\')'
    ).replace(/"m_eventStringCode": "([A-Za-z]+)"/g, (match, type) => 'm_eventStringCode: EventCode.' + findKey(EventCode, type))
  )
}

const parseMessage = (data: number[]): Packet | undefined => {
  const parsed = F1TelemetryClient.parseBufferMessage(Buffer.from(data), true)
  return parsed?.data
}

for (let year = 2018; year <= 2025; year++) {
  const file = `src/mocks/${year}.json`
  const liner = fs.existsSync(file) ? new LineByLine(file) : null
  let line = null
  let lineNumber = 1

  while ((line = liner?.next() ?? false) !== false) {
    const data = JSON.parse(line?.toString() ?? null)
    const bufferData: number[] = data?.message?.data ?? data?.message
    const parsed = parseMessage(bufferData)
    writeTSFile(parsed, `${year}-${lineNumber++}`)
  }
}
