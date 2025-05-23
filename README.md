# F1 Telemetry Client

[![Node.js CI](https://github.com/z0mt3c/f1-telemetry-client/actions/workflows/node.js.yml/badge.svg)](https://github.com/z0mt3c/f1-telemetry-client/actions/workflows/node.js.yml)
[![NPM Release](https://img.shields.io/npm/v/@z0mt3c/f1-telemetry-client.svg)](https://snyk.io/test/github/z0mt3c/f1-telemetry-client?targetFile=package.json)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License: MIT](https://img.shields.io/github/license/z0mt3c/f1-telemetry-client.svg)](https://opensource.org/licenses/MIT)

The F1 series of games support the outputting of key game data via a UDP data stream. This data can be interpreted by external apps or connected peripherals for a range of different uses, including providing additional telemetry information, customised HUD displays, motion platform hardware support or providing force feedback data for custom steering wheels.

This is a TypeScript UDP client and telemetry parser for EA - Codemaster's F1 24, F1 23, F1 22, F1 2021, F1 2020, F1 2019 and F1 2018, that enables the consumption of such information.

This project has originally been developed by and was forked from [@racehub-io](https://github.com/racehub-io). The original source is located at [@racehub-io/f1-telemetry-client](https://github.com/racehub-io/f1-telemetry-client).

## Installing

```
$ npm install @z0mt3c/f1-telemetry-client
```

or

```
$ yarn add @z0mt3c/f1-telemetry-client
```

## Running the playground

```
$ npm run start
```

or

```
$ yarn start
```

## Usage

```
import { F1TelemetryClient } from "f1-telemetry-client";
import { PACKETS } from "f1-telemetry-client/constants";
import { ... } from "f1-telemetry-client/types";
// or: const { F1TelemetryClient, constants } = require('f1-telemetry-client');

/*
*   'port' is optional, defaults to 20777
*   'bigintEnabled' is optional, setting it to false makes the parser skip bigint values,
*                   defaults to true
*   'forwardAddresses' is optional, it's an array of Address objects to forward unparsed telemetry to. each address object is comprised of a port and an optional ip address
*                   defaults to undefined
*   'skipParsing' is optional, setting it to true will make the client not parse and emit content. You can consume telemetry data using forwardAddresses instead.
*                   defaults to false
*/
const client = new F1TelemetryClient({ port: 20777 });
client.on(PACKETS.event, console.log);
client.on(PACKETS.motion, console.log);
client.on(PACKETS.carSetups, console.log);
client.on(PACKETS.lapData, console.log);
client.on(PACKETS.session, console.log);
client.on(PACKETS.participants, console.log);
client.on(PACKETS.carTelemetry, console.log);
client.on(PACKETS.carStatus, console.log);
client.on(PACKETS.finalClassification, console.log);
client.on(PACKETS.lobbyInfo, console.log);
client.on(PACKETS.carDamage, console.log);
client.on(PACKETS.sessionHistory, console.log);
client.on(PACKETS.tyreSets, console.log);
client.on(PACKETS.motionEx, console.log);
client.on(PACKETS.timeTrial, console.log);

// to get further communication details like remoteInfo
client.on(PACKETS.timeTrial + ':raw', console.log);

// to catch all events
client.on('*', console.log);

// to start listening:
client.start();

// and when you want to stop:
client.stop();
```

## Documentation

The following links contain information that summarises the UDP data structures so that developers of supporting hardware or software are able to configure these to work correctly with the F1 game.

- F1 2025 UDP Spec (WIP)
- F1 2024 UDP Spec
- [F1 2023 UDP Spec](https://answers.ea.com/t5/General-Discussion/F1-23-UDP-Specification/td-p/12632888)
- [F1 2022 UDP Spec](https://answers.ea.com/t5/General-Discussion/F1-22-UDP-Specification/td-p/11551274)
- [F1 2020 UDP Spec](https://forums.codemasters.com/topic/50942-f1-2020-udp-specification/)
- [F1 2021 UDP Spec](https://forums.codemasters.com/topic/80231-f1-2021-udp-specification/)
- [F1 2019 UDP Spec](https://forums.codemasters.com/topic/44592-f1-2019-udp-specification/)
- [F1 2018 UDP Spec](https://forums.codemasters.com/discussion/136948/f1-2018-udp-specification)

## License

This project has originally been developed by and was forked from [@racehub-io](https://github.com/racehub-io). The original source is located at [@racehub-io/f1-telemetry-client](https://github.com/racehub-io/f1-telemetry-client).

Licensed under the MIT License.
