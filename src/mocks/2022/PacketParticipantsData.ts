export const PACKET_PARTICIPANTS_DATA_BUFFER_2022 =
    Buffer
        .from(
            'e6070105010484cf5b0f90c534418d3e1d419f01000013ff140113ff0400120d5354524f4c4c00000000000000000000000000000000000000000000000000000000000000000000000000000000000001013aff010010354c45434c455243000000000000000000000000000000000000000000000000000000000000000000000000000000000001013bff06000a1c4741534c590000000000000000000000000000000000000000000000000000000000000000000000000000000000000001010fff09004d1b424f54544153000000000000000000000000000000000000000000000000000000000000000000000000000000000000010132ff00003f0a52555353454c4c000000000000000000000000000000000000000000000000000000000000000000000000000000000001010bff070014154d41474e555353454e000000000000000000000000000000000000000000000000000000000000000000000000000000010111ff05001f1c4f434f4e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010136ff0800040a4e4f5252495300000000000000000000000000000000000000000000000000000000000000000000000000000000000001013eff03001750414c424f4e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000001013fff0300060d4c4154494649000000000000000000000000000000000000000000000000000000000000000000000000000000000000010151ff07002f1d534348554d41434845520000000000000000000000000000000000000000000000000000000000000000000000000000010102ff0800030352494343494152444f00000000000000000000000000000000000000000000000000000000000000000000000000000001010eff02000b3450c38952455a000000000000000000000000000000000000000000000000000000000000000000000000000000000000010150ff0900180f4755414e595500000000000000000000000000000000000000000000000000000000000000000000000000000000000001015eff0600162b5453554e4f44410000000000000000000000000000000000000000000000000000000000000000000000000000000000010107ff00002c0a48414d494c544f4e00000000000000000000000000000000000000000000000000000000000000000000000000000000010100ff0100374d5341494e5a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000010103ff05000e4d414c4f4e534f00000000000000000000000000000000000000000000000000000000000000000000000000000000000001010dff0400051d56455454454c000000000000000000000000000000000000000000000000000000000000000000000000000000000000010009ff020021165645525354415050454e00000000000000000000000000000000000000000000000000000000000000000000000000000100ffffff0000ff0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffffff0000ff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
            'hex')
        .toJSON()
        .data;

export const PACKET_PARTICIPANTS_DATA_PARSED_2022 = {
  m_header: {
    m_packetFormat: 2022,
    m_gameMajorVersion: 1,
    m_gameMinorVersion: 5,
    m_packetVersion: 1,
    m_packetId: 4,
    m_sessionUID: 4698597533777907588n,
    m_sessionTime: 9.827771186828613,
    m_frameIdentifier: 415,
    m_playerCarIndex: 19,
    m_secondaryPlayerCarIndex: 255,
  },
  m_numActiveCars: 20,
  m_participants: [
    {
      m_aiControlled: 1,
      m_driverId: 19,
      m_networkId: 255,
      m_teamId: 4,
      m_myTeam: 0,
      m_raceNumber: 18,
      m_nationality: 13,
      m_name: 'STROLL',
      m_yourTelemetry: 1
    },
    {
      m_aiControlled: 1,
      m_driverId: 58,
      m_networkId: 255,
      m_teamId: 1,
      m_myTeam: 0,
      m_raceNumber: 16,
      m_nationality: 53,
      m_name: 'LECLERC',
      m_yourTelemetry: 1
    },
    {
      m_aiControlled: 1,
      m_driverId: 59,
      m_networkId: 255,
      m_teamId: 6,
      m_myTeam: 0,
      m_raceNumber: 10,
      m_nationality: 28,
      m_name: 'GASLY',
      m_yourTelemetry: 1
    },
    {
      m_aiControlled: 1,
      m_driverId: 15,
      m_networkId: 255,
      m_teamId: 9,
      m_myTeam: 0,
      m_raceNumber: 77,
      m_nationality: 27,
      m_name: 'BOTTAS',
      m_yourTelemetry: 1
    },
    {
      m_aiControlled: 1,
      m_driverId: 50,
      m_networkId: 255,
      m_teamId: 0,
      m_myTeam: 0,
      m_raceNumber: 63,
      m_nationality: 10,
      m_name: 'RUSSELL',
      m_yourTelemetry: 1
    },
    {
      m_aiControlled: 1,
      m_driverId: 11,
      m_networkId: 255,
      m_teamId: 7,
      m_myTeam: 0,
      m_raceNumber: 20,
      m_nationality: 21,
      m_name: 'MAGNUSSEN',
      m_yourTelemetry: 1
    },
    {
      m_aiControlled: 1,
      m_driverId: 17,
      m_networkId: 255,
      m_teamId: 5,
      m_myTeam: 0,
      m_raceNumber: 31,
      m_nationality: 28,
      m_name: 'OCON',
      m_yourTelemetry: 1
    },
    {
      m_aiControlled: 1,
      m_driverId: 54,
      m_networkId: 255,
      m_teamId: 8,
      m_myTeam: 0,
      m_raceNumber: 4,
      m_nationality: 10,
      m_name: 'NORRIS',
      m_yourTelemetry: 1
    },
    {
      m_aiControlled: 1,
      m_driverId: 62,
      m_networkId: 255,
      m_teamId: 3,
      m_myTeam: 0,
      m_raceNumber: 23,
      m_nationality: 80,
      m_name: 'ALBON',
      m_yourTelemetry: 1
    },
    {
      m_aiControlled: 1,
      m_driverId: 63,
      m_networkId: 255,
      m_teamId: 3,
      m_myTeam: 0,
      m_raceNumber: 6,
      m_nationality: 13,
      m_name: 'LATIFI',
      m_yourTelemetry: 1
    },
    {
      m_aiControlled: 1,
      m_driverId: 81,
      m_networkId: 255,
      m_teamId: 7,
      m_myTeam: 0,
      m_raceNumber: 47,
      m_nationality: 29,
      m_name: 'SCHUMACHER',
      m_yourTelemetry: 1
    },
    {
      m_aiControlled: 1,
      m_driverId: 2,
      m_networkId: 255,
      m_teamId: 8,
      m_myTeam: 0,
      m_raceNumber: 3,
      m_nationality: 3,
      m_name: 'RICCIARDO',
      m_yourTelemetry: 1
    },
    {
      m_aiControlled: 1,
      m_driverId: 14,
      m_networkId: 255,
      m_teamId: 2,
      m_myTeam: 0,
      m_raceNumber: 11,
      m_nationality: 52,
      m_name: 'PÉREZ',
      m_yourTelemetry: 1
    },
    {
      m_aiControlled: 1,
      m_driverId: 80,
      m_networkId: 255,
      m_teamId: 9,
      m_myTeam: 0,
      m_raceNumber: 24,
      m_nationality: 15,
      m_name: 'GUANYU',
      m_yourTelemetry: 1
    },
    {
      m_aiControlled: 1,
      m_driverId: 94,
      m_networkId: 255,
      m_teamId: 6,
      m_myTeam: 0,
      m_raceNumber: 22,
      m_nationality: 43,
      m_name: 'TSUNODA',
      m_yourTelemetry: 1
    },
    {
      m_aiControlled: 1,
      m_driverId: 7,
      m_networkId: 255,
      m_teamId: 0,
      m_myTeam: 0,
      m_raceNumber: 44,
      m_nationality: 10,
      m_name: 'HAMILTON',
      m_yourTelemetry: 1
    },
    {
      m_aiControlled: 1,
      m_driverId: 0,
      m_networkId: 255,
      m_teamId: 1,
      m_myTeam: 0,
      m_raceNumber: 55,
      m_nationality: 77,
      m_name: 'SAINZ',
      m_yourTelemetry: 1
    },
    {
      m_aiControlled: 1,
      m_driverId: 3,
      m_networkId: 255,
      m_teamId: 5,
      m_myTeam: 0,
      m_raceNumber: 14,
      m_nationality: 77,
      m_name: 'ALONSO',
      m_yourTelemetry: 1
    },
    {
      m_aiControlled: 1,
      m_driverId: 13,
      m_networkId: 255,
      m_teamId: 4,
      m_myTeam: 0,
      m_raceNumber: 5,
      m_nationality: 29,
      m_name: 'VETTEL',
      m_yourTelemetry: 1
    },
    {
      m_aiControlled: 0,
      m_driverId: 9,
      m_networkId: 255,
      m_teamId: 2,
      m_myTeam: 0,
      m_raceNumber: 33,
      m_nationality: 22,
      m_name: 'VERSTAPPEN',
      m_yourTelemetry: 1
    },
    {
      m_aiControlled: 0,
      m_driverId: 255,
      m_myTeam: 0,
      m_name: '',
      m_nationality: 255,
      m_networkId: 255,
      m_raceNumber: 0,
      m_teamId: 255,
      m_yourTelemetry: 0,
    },
    {
      m_aiControlled: 0,
      m_driverId: 255,
      m_myTeam: 0,
      m_name: '',
      m_nationality: 255,
      m_networkId: 255,
      m_raceNumber: 0,
      m_teamId: 255,
      m_yourTelemetry: 0,
    },
  ]
};
