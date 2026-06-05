# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

TypeScript UDP client + binary telemetry parser for EA/Codemasters F1 games **2018–2025**. Published as `@z0mt3c/f1-telemetry-client` (CJS, built to `build/cjs`). Runtime deps are only `binary-parser` + `struct`.

Use **npm** (repo has `package-lock.json`, no pnpm lockfile).

## Commands

- `npm run build` — clean + `tsc` to `build/cjs` (declarations included).
- `npm run type-check` / `... :watch` — `tsc --noEmit`.
- `npm run lint` / `npm run fix` — eslint (`eslint-config-love`) over `src`, `--fix` variant.
- `npm run format` / `npm run check` — prettier write / verify.
- `npm test` — jest. **`pretest` rebuilds and `posttest` lints automatically.** To run tests without the rebuild/lint cycle use `npx jest`.
- Single test: `npx jest -t "F1 2024"` (year suite) or `npx jest -t "L12"` (mock line). Each mock line becomes its own `it`.
- `npm run test:schema` — full round-trip: regenerate `src/samples/*.ts` from mocks, fix, test, clean. Run after touching parsers or types to confirm sample emission still compiles.
- Playground (tsx, no build): `npm start` (listen on UDP 30500), `npm run record` (capture live UDP → `./recordings/*.txt`), `npm run replay` (replay a recording to a UDP target).

`replay.ts` reads env vars: `REPLAY_FILE` (required), `REPLAY_IP`, `REPLAY_PORT` (default 20999), `REPLAY_SPEED`, `REPLAY_START_LINE`.

## Architecture

**Receive → parse → emit pipeline** lives in `src/index.ts` (`F1TelemetryClient extends EventEmitter`):

1. `start()` binds a `udp4` socket; every datagram hits `handleMessage`.
2. If `forwardAddresses` is set, the raw buffer is first re-sent to each address (`bridgeMessage`) — this is independent of parsing and works even with `skipParsing`.
3. `parseBufferMessage` reads the header to discover packet **format (= game year)** and **packetId**, picks a parser via `getParserByPacketId` (a switch over `PACKET_ID_TO_PACKET` → `PACKETS`), runs it, and returns `{ id, year, format, name, data, message, remoteInfo }`.
4. `emitPackage` fires three events per packet: `name` (parsed data), `name + ':raw'` (full envelope incl. `remoteInfo`), and `'*'`. Parse failures throw `ParserError` and emit `'error'` + `'*'` (with `.context`).

**Two-tier parser pattern** (`src/parsers/`): every parser extends `F1Parser<T>`, a thin subclass of `binary-parser`'s `Parser` adding `fromBuffer`. Parsers are built imperatively in the constructor.
- `PacketXxxDataParser` = a full UDP packet: nests `m_header` (`PacketHeaderParser`) then an `.array(...)` of per-car sub-records.
- `XxxDataParser` = one sub-record (e.g. `CarTelemetryDataParser`).
- **Version handling is inline**: each constructor takes `packetFormat` and branches on it (`if (packetFormat >= 2020)`, field type swaps, array lengths). This is the core complexity — the same parser class handles all years by conditionally shaping the binary layout. When adding a year or field, edit these conditionals, not separate per-year files.

**Header detection**: `PacketFormatParser` reads just the first field (`m_packetFormat`) so the correct `PacketHeaderParser` layout can be chosen before full parse (header shape itself differs by year).

**`bigintEnabled`** (default true): controls whether 64-bit fields like `m_sessionUID` parse as `BigInt`. JSON serialization everywhere uses a `bigint → string` replacer.

**`src/constants/`**: each file is one lookup (teams, tracks, tyres, penalties, …) re-exported via `index.ts`. Two are load-bearing for the pipeline:
- `packets.ts` — `PACKETS` enum, `PACKET_ID_TO_PACKET` map.
- `packetSizes.ts` — `PACKET_SIZES[packetName][year]` = expected byte length; tests assert incoming buffer length matches before parsing.

**`src/types.ts`** — all packet/sub-record interfaces, `Options`, `ParsedMessage`, `ParserError`, `EventCode`. Exported via the `./types` subpath.

**Public entry points** (`package.json` exports): `.` (client + `constants`), `./types`, `./constants`.

## Tests

`src/index.test.ts` is data-driven: for each year 2018–2025 it streams `src/mocks/<year>.json` line by line, asserts buffer length equals `getPacketSize(...)`, parses, and deep-equals against the recorded `parsed` value (with bigints normalized to strings). The mocks are the source of truth — a parser change that alters output will fail these unless mocks are regenerated.

## Conventions

- Binary field names keep the game's `m_camelCase` / `m_snake` naming; eslint `naming-convention` is configured to allow `m_*` and numeric property keys, so don't rename them to satisfy lint.
- Don't hand-edit lockfiles; manage deps via `npm`.
