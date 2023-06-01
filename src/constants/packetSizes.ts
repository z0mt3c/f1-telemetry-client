import {PacketSize} from './types';

export const PACKET_SIZES: {[index: string]: {[index: number]: PacketSize}} = {
  motion: {
    2023: 1349,
    2022: 1464,
    2021: 1464,
    2020: 1464,
    2019: 1343,
    2018: 1341,
  },
  session: {2023: 644, 2022: 632, 2021: 625, 2020: 251, 2019: 149, 2018: 147},
  lapData: {2023: 1131, 2022: 972, 2021: 970, 2020: 1190, 2019: 843, 2018: 841},
  event: {2023: 45, 2022: 40, 2021: 36, 2020: 35, 2019: 32, 2018: 25},
  participants: {
    2023: 1306,
    2022: 1257,
    2021: 1257,
    2020: 1213,
    2019: 1104,
    2018: 1082,
  },
  carSetups: {
    2023: 1107,
    2022: 1102,
    2021: 1102,
    2020: 1102,
    2019: 843,
    2018: 841,
  },
  carTelemetry: {
    2023: 1352,
    2022: 1347,
    2021: 1347,
    2020: 1307,
    2019: 1347,
    2018: 1085,
  },
  carStatus: {
    2023: 1239,
    2022: 1058,
    2021: 1058,
    2020: 1344,
    2019: 1143,
    2018: 1061,
  },
  finalClassification: {2023: 1020, 2022: 1015, 2021: 839, 2020: 839},
  lobbyInfo: {2023: 1218, 2022: 1191, 2021: 1191, 2020: 1169},
  carDamage: {2023: 953, 2022: 948, 2021: 882},
  sessionHistory: {2023: 1460, 2022: 1155, 2021: 1155},
  tyreSets: {2023: 231},
  motionEx: {2023: 217},
};
