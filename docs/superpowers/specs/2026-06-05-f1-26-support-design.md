# F1 26 (2026 Season Pack) UDP Support — Design

**Date:** 2026-06-05
**Status:** Approved (design phase)
**Source diff:** `misc/DIFF-F1-25-to-2026-Season-Pack.md`

## Goal

Add parsing support for the F1 26 / "2026 Season Pack" UDP telemetry format (`m_packetFormat = 2026`, `m_gameYear = 26`) to the existing multi-year parser. This extends the current 2018–2025 coverage with format `2026`, including a new packet type, several field-type changes, an expanded car count, and updated ID lookup tables.

## Context

The library (`@z0mt3c/f1-telemetry-client`) parses Codemasters/EA F1 UDP packets. Each parser class is built imperatively on `binary-parser` and handles all supported years inside one class via inline `if (packetFormat >= YYYY)` conditionals. Format detection happens in `F1TelemetryClient.parseBufferMessage` → `getParserByPacketId`. Tests are data-driven from recorded captures in `src/mocks/<year>.json`.

Because format `2026 > 2025`, every existing `>= 2025` / `>= 2024` branch already fires for 2026. The new work is therefore **additive overrides** (`>= 2026` branches that change field widths or append fields) plus one entirely new packet.

### Constraints / decisions

- **No real F1 26 capture data yet.** User will record `src/mocks/2026.json` later. Until then there is no round-trip mock.
- **Verification now = `type-check` + `lint` only.** No runtime tests added for 2026 in this iteration (user decision). The test loop upper bound is raised to 2026 but skips automatically via `fs.existsSync` until a mock exists.
- Full scope confirmed: new CarTelemetry2 packet, all 2026 field changes, Team/Driver ID constants, README/docs.

## Approach

**Chosen: inline format-conditional extension + a car-count helper.**

Matches the codebase's existing one-class-per-packet convention. Each affected parser gains a `>= 2026` branch. Rejected alternatives:
- *Separate 2026 parser classes* — breaks convention, duplicates field lists.
- *Minimal (new packet + sizes only)* — excludes the field changes the user wants.

### Targeted improvement: car-count helper

The car count changes 22 → 24. This value appears at **15 sites** today, in two forms (`packetFormat >= 2020 ? 22 : 20` and hardcoded `length: 22`). Introduce a single helper and replace all sites:

```ts
// src/constants/cars.ts
export const carCount = (packetFormat: number): number =>
  packetFormat >= 2026 ? 24 : packetFormat >= 2020 ? 22 : 20
```

Exported from `src/constants/index.ts`. Used by: motion, participants, carSetups, lapData, carTelemetry, carStatus, carDamage, lobbyInfo, finalClassification, lapPositions (inner array), and the new carTelemetry2 parser. Packets that did not exist before 2020 keep correct behaviour (the `< 2020` branch is unreachable for them).

## Detailed changes

### 1. Field-type overrides (per `>= 2026` branch)

| File | Field | Change |
|---|---|---|
| `CarMotionDataParser.ts` | `m_gForceLateral`, `m_gForceLongitudinal`, `m_gForceVertical` | `floatle` → `int16le`. Add `packetFormat` constructor param; update caller `PacketMotionDataParser`. Values are quantised — consumer divides by 1000.0; the parser stores the raw int16. |
| `CarTelemetryDataParser.ts` | `m_engineTemperature` | `uint16le` → `uint8` |
| `ParticipantDataParser.ts` | `m_driverId`, `m_networkId`, `m_teamId` | `uint8` → `uint16le` (`m_networkId` stays inside the existing `>= 2021` guard) |
| `LobbyInfoDataParser.ts` | `m_teamId` | `uint8` → `uint16le` |
| `PacketTimeTrialDataParser.ts` (`TimeTrialDataSetParser`) | `m_teamId` | `uint8` → `uint16le`. Add `packetFormat` param to the sub-parser. |
| `CarStatusDataParser.ts` | `m_ersHarvestLimitPerLap` (new) | Insert `floatle('m_ersHarvestLimitPerLap')` **before** `m_ersDeployedThisLap` when `>= 2026` |
| `PacketEventDataParser.ts` (`CollisionParser`) | `severity` (new) | Append `uint8('severity')` when `>= 2026`. `CollisionParser` gains a `packetFormat` param. |

### 2. Session packet (`PacketSessionDataParser.ts`)

Append a new `if (packetFormat >= 2026)` block after the existing `>= 2024` block (which ends with `m_sector2/3LapDistanceStart`):

```
m_activeAeroTrackStatus        uint8
m_numActiveAeroZonesFull       uint8
m_activeAeroZonesFull[8]       ActiveAeroZone   (float zoneStart, float zoneEnd)
m_numActiveAeroZonesPartial    uint8
m_activeAeroZonesPartial[8]    ActiveAeroZone
m_numDRSZones                  uint8
m_drsZones[4]                  DRSZone          (float zoneStart, float zoneEnd)
m_startReactionTime            float
m_antiLockBrakesAssist         uint8
m_tractionControlAssist        uint8
m_dynamicRacingLineHiVis       uint8
m_dynamicRacingLineColourBlind uint8
m_recurringRewindPrompt        uint8
```

New sub-parsers `ActiveAeroZoneParser` and `DRSZoneParser` (each: `floatle('m_zoneStart').floatle('m_zoneEnd')`). `m_marshalZones` length stays 21; `m_weatherForecastSamples` length stays 56 (unchanged from the working 2025 path). `m_formula` value `13 = F1 26` is a value-level addition only — the parser already reads `m_formula`, no code change.

### 3. New packet: Car Telemetry 2 (id 16)

- `CarTelemetry2DataParser.ts` — per car: `m_activeAeroMode` u8, `m_activeAeroAvailable` u8, `m_activeAeroActivationDistance` u16le, `m_overtakeAvailable` u8, `m_overtakeActive` u8, `m_overtakeActivationDistance` u16le, `m_2026Regulations` u8, `m_drivingWrongWay` u8.
- `PacketCarTelemetry2DataParser.ts` — header + `array('m_carTelemetry2Data', { length: carCount(packetFormat), type: new CarTelemetry2DataParser() })`.
- `src/constants/packets.ts` — add `carTelemetry2 = 'carTelemetry2'` to `PACKETS`; add `16: PACKETS.carTelemetry2` to `PACKET_ID_TO_PACKET`.
- `src/index.ts` — import + `case PACKETS.carTelemetry2: return PacketCarTelemetry2DataParser`.
- `src/parsers/packets/index.ts` — export the new parser(s).
- `src/constants/packetSizes.ts` — append a `carTelemetry2` entry at **position 16** (after the existing `unknown` entry, which is positionally id 15 / lapPositions): `{ 2026: 269 }`. `PACKET_SIZES` is positionally indexed by `getPacketSize`, so order matters.

### 4. Packet sizes (existing entries)

Add a `2026` column to every `PACKET_SIZES` entry using the size table in the diff doc (Motion 1325, Session 926, Lap 1399, Event 45, Participants 1470, CarSetups 1233, CarTelemetry 1448, CarStatus 1445, FinalClassification 1134, LobbyInfo 1062, CarDamage 1133, SessionHistory 1460, TyreSets 231, MotionEx 273, TimeTrial 104, LapPositions 1231). Test-only / future-use (the runtime parse path does not call `getPacketSize`).

### 5. Constants (ID tables)

- `src/constants/teams.ts` — add IDs **465–486** (F2 '25 teams 465–475, F1 '26 teams 476–484, Audi '26 = 485, Cadillac '26 = 486).
- `src/constants/drivers.ts` — add IDs **186–197** (F2 2025 grid: Luke Browning, Cian Shields, Arvid Lindblad, Dino Beganovic, Leonardo Fornaroli, Oliver Goethe, Gabriele Minì, Sebastián Montoya, Alexander Dunne, Max Esterson, Sami Meguetounif, John Bennett).

No changes to `tracks.ts`, `nationalities.ts`, `gameModes.ts`, `rulesets.ts`, `surfaces.ts`, `buttonFlags.ts`, `penalties.ts`, `infringements.ts`, `sessionTypes.ts` (verified identical between the F1 25 and 2026 Season Pack PDFs).

### 6. Types (`src/types.ts`)

- New interfaces: `CarTelemetry2Data`, `PacketCarTelemetry2Data`, `ActiveAeroZone`, `DRSZone`.
- Extend with optional members: `PacketSessionData` (the aero/DRS-zone block + new settings fields), `CarStatusData` (`m_ersHarvestLimitPerLap`), `CollisionEventDetails` (`severity`).
- Field width changes (uint8→uint16) do not alter TS types — all remain `number`.

### 7. README

Add `f126` / `f1 26` to `keywords`; add `carTelemetry2` to the packet list and the usage example's event listeners; mention F1 26 in the intro line.

## Components / boundaries

- **Per-car layout sub-parsers** (`CarMotionDataParser`, `CarTelemetry2DataParser`, `ActiveAeroZoneParser`, `DRSZoneParser`, …) — each describes one record's binary layout; depend only on `packetFormat`.
- **Packet parsers** (`Packet*DataParser`) — compose header + sub-parser arrays; own the car-count via `carCount(format)`.
- **`carCount` helper** — single source of truth for cars-per-packet across formats.
- **Dispatch** (`index.ts` / `packets.ts`) — maps packet id → parser → emitted event name.

## Error handling

Unchanged. Parse failures continue to throw `ParserError` and emit `error` + `*` with context. A 2026 packet whose buffer length mismatches the parser layout will surface as a parse error, which is the intended signal when the real capture eventually arrives.

## Testing

- `npm run type-check` and `npm run lint` must pass (the only gates this iteration).
- `index.test.ts`: raise the year loop bound `2025` → `2026`. The loop already guards each year with `fs.existsSync`, so 2026 is skipped until `src/mocks/2026.json` exists.
- `generate-samples.ts`: add a `carTelemetry2` entry to `typeMapping` and raise its loop bound to 2026 (skips until mock present).
- **Deferred:** once a real F1 26 capture is recorded into `src/mocks/2026.json`, the existing data-driven suite validates sizes + round-trip automatically.

## Out of scope

- Recording the real `src/mocks/2026.json` capture (user does this later).
- Runtime/synthetic tests for 2026.
- Any refactor beyond the `carCount` helper.
