import { F1TelemetryClient } from '..'
import * as fs from 'fs'
import type { ParsedMessage } from '../types'

const client = new F1TelemetryClient({
  port: 30500,
  bigintEnabled: true
})

fs.mkdir('./recordings', () => {})

client.on('*', ({ data, id, format, message }: ParsedMessage) => {
  const mHeader = data?.m_header
  const filename = [
    'data',
    mHeader?.m_gameYear ?? 'unknown',
    format,
    mHeader?.m_sessionUID ?? 'no-session'
  ]
    .filter(n => n !== null)
    .join('-')

  const serializable =
    JSON.stringify(
      {
        time: new Date().toJSON(),
        gameYear: mHeader?.m_gameYear ?? 'unknown',
        format,
        packetID: id,
        message,
        parsed: data
      },
      (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    ) + '\n'

  fs.appendFileSync(`./recordings/${filename}-${id}.txt`, serializable)
  fs.appendFileSync(`./recordings/${filename}-all.txt`, serializable)
})

client.start();

// stops the client
[
  'exit',
  'SIGINT',
  'SIGUSR1',
  'SIGUSR2',
  'uncaughtException',
  'SIGTERM'
].forEach(eventType => {
  (process as NodeJS.EventEmitter).on(eventType, () => client.stop())
})
