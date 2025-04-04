import { F1TelemetryClient } from '..'
import * as fs from 'fs'
import { type PacketData, type ParsedMessage, type ParserError } from '../types'

const client = new F1TelemetryClient({
  port: 30500,
  bigintEnabled: true
})

fs.mkdir('./recordings', () => {})

client.on('*', ({ data, id, format, message }: ParsedMessage<PacketData>) => {
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

client.on('error', ({ cause, context }: ParserError<PacketData>) => {
  try {
    const { format, id, year, message, name } = context
    const causeMessage = cause instanceof Error ? cause.message : undefined
    console.log('Error', { format, id, name, year, causeMessage, message })

    const filename = [
      'error',
      year,
      format,
      'unknown-session'
    ]
      .filter(n => n !== null)
      .join('-')

    const serializable =
      JSON.stringify(
        {
          time: new Date().toJSON(),
          gameYear: year ?? 'unknown',
          format,
          packetID: id,
          message,
          causeMessage,
          cause
        },
        (key, value) => (typeof value === 'bigint' ? value.toString() : value)
      ) + '\n'

    fs.appendFileSync(`./recordings/${filename}-${id}.txt`, serializable)
  } catch (e) {
    console.error('Error writing error log', e)
  }
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
  (process as NodeJS.EventEmitter).on(eventType, (e) => {
    console.error('stopping', e)
    client.stop()
  })
})
