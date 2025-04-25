import { F1TelemetryClient } from '..'
import * as fs from 'fs'
import LineByLine from 'n-readlines'
import { SingleBar, Presets } from 'cli-progress'

const target = { ip: process.env.REPLAY_IP ?? '0.0.0.0', port: parseInt(process.env.REPLAY_PORT ?? '20999') }
const client = new F1TelemetryClient({
  port: 99999,
  bigintEnabled: true,
  forwardAddresses: [target],
})

const sleep = async (ms: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, ms))
}
const file: string = process.env.REPLAY_FILE ?? ''
const speed: number = parseFloat(process.env.REPLAY_SPEED ?? '1')
if (!fs.existsSync(file)) throw new Error(`REPLAY_FILE file not found: ${file}`)
const fileSize = fs.statSync(file).size
const liner = new LineByLine(file)

const startLine = parseInt(process.env.REPLAY_START_LINE ?? '0')
console.log(`Replay target: ${target.ip}:${target.port}`)
console.log(`Replay file:   ${file}`)
console.log(`Start line:    ${startLine}`)

const progressBar = new SingleBar({}, Presets.shades_classic)
progressBar.start(Math.round((fileSize / 1024 / 1024) * 10) / 10, 0)
let read: number = 0
let no: number = 0
const start = async (): Promise<void> => {
  let lastEventAt: number | null = null
  let line = null
  while ((line = liner?.next()) !== false && line != null) {
    read += line.length
    if (no++ >= startLine) {
      const data = JSON.parse(line.toString()) as { time: string; message: any }
      const bufferData: number[] = data?.message?.data ?? data?.message
      const buffer: Buffer = Buffer.from(bufferData)
      const time = new Date(data.time)
      const timeToSleep = lastEventAt != null ? (time.getTime() - lastEventAt) / speed : 0
      if (timeToSleep > 0) await sleep(timeToSleep)
      lastEventAt = time.getTime()
      progressBar.update(Math.round((read / 1024 / 1024) * 10) / 10)
      client.bridgeMessage(buffer)
    }
  }
  progressBar.stop()
}

start().catch(console.log)
