export interface PacketHeaderBase {
  m_packetFormat: number
}

export interface PacketHeader extends PacketHeaderBase {
  m_gameYear?: number
  m_gameMajorVersion?: number
  m_gameMinorVersion?: number
  m_packetVersion: number
  m_packetId: number
  m_sessionUID: bigint
  m_sessionTime: number
  m_frameIdentifier: number
  m_overallFrameIdentifier?: number
  m_playerCarIndex: number
  m_secondaryPlayerCarIndex?: number
}

export interface PacketBase {
  m_header: PacketHeader
}

export interface PacketMotionData extends PacketBase {
  m_carMotionData: MotionData[]
  m_suspensionPosition?: number[]
  m_suspensionVelocity?: number[]
  m_suspensionAcceleration?: number[]
  m_wheelSpeed?: number[]
  m_wheelSlip?: number[]
  m_localVelocityX?: number
  m_localVelocityY?: number
  m_localVelocityZ?: number
  m_angularVelocityX?: number
  m_angularVelocityY?: number
  m_angularVelocityZ?: number
  m_angularAccelerationX?: number
  m_angularAccelerationY?: number
  m_angularAccelerationZ?: number
  m_frontWheelsAngle?: number
}

export interface MotionData {
  m_worldPositionX: number
  m_worldPositionY: number
  m_worldPositionZ: number
  m_worldVelocityX: number
  m_worldVelocityY: number
  m_worldVelocityZ: number
  m_worldForwardDirX: number
  m_worldForwardDirY: number
  m_worldForwardDirZ: number
  m_worldRightDirX: number
  m_worldRightDirY: number
  m_worldRightDirZ: number
  m_gForceLateral: number
  m_gForceLongitudinal: number
  m_gForceVertical: number
  m_yaw: number
  m_pitch: number
  m_roll: number
}

export interface PacketMotionExData extends PacketBase {
  m_suspensionPosition: number[]
  m_suspensionVelocity: number[]
  m_suspensionAcceleration: number[]
  m_wheelSpeed: number[]
  m_wheelSlipRatio: number[]
  m_wheelSlipAngle: number[]
  m_wheelLatForce: number[]
  m_wheelLongForce: number[]
  m_heightOfCOGAboveGround: number
  m_localVelocityX: number
  m_localVelocityY: number
  m_localVelocityZ: number
  m_angularVelocityX: number
  m_angularVelocityY: number
  m_angularVelocityZ: number
  m_angularAccelerationX: number
  m_angularAccelerationY: number
  m_angularAccelerationZ: number
  m_frontWheelsAngle: number
  m_wheelVertForce: number[]
  m_frontAeroHeight?: number
  m_rearAeroHeight?: number
  m_frontRollAngle?: number
  m_rearRollAngle?: number
  m_chassisYaw?: number
  m_chassisPitch?: number
  m_wheelCamber?: number[]
  m_wheelCamberGain?: number[]
}

export interface PacketLapData extends PacketBase {
  m_lapData: LapData[]
  m_timeTrialPBCarIdx?: number
  m_timeTrialRivalCarIdx?: number
}

export interface PacketSessionData extends PacketBase {
  m_weather: number
  m_trackTemperature: number
  m_airTemperature: number
  m_totalLaps: number
  m_trackLength: number
  m_sessionType: number
  m_trackId: number
  m_era?: number
  m_formula?: number
  m_sessionTimeLeft: number
  m_sessionDuration: number
  m_pitSpeedLimit: number
  m_gamePaused: number
  m_isSpectating: number
  m_spectatorCarIndex: number
  m_sliProNativeSupport: number
  m_numMarshalZones: number
  m_marshalZones: MarshalZone[]
  m_safetyCarStatus: number
  m_networkGame: number
  m_numWeatherForecastSamples?: number
  m_weatherForecastSamples?: WeatherForecastSample[]
  m_forecastAccuracy?: number
  m_aiDifficulty?: number
  m_seasonLinkIdentifier?: number
  m_weekendLinkIdentifier?: number
  m_sessionLinkIdentifier?: number
  m_pitStopWindowIdealLap?: number
  m_pitStopWindowLatestLap?: number
  m_pitStopRejoinPosition?: number
  m_steeringAssist?: number
  m_brakingAssist?: number
  m_gearboxAssist?: number
  m_pitAssist?: number
  m_pitReleaseAssist?: number
  m_ERSAssist?: number
  m_DRSAssist?: number
  m_dynamicRacingLine?: number
  m_dynamicRacingLineType?: number
  m_gameMode?: number
  m_ruleSet?: number
  m_timeOfDay?: number
  m_sessionLength?: number
  m_speedUnitsLeadPlayer?: number
  m_temperatureUnitsLeadPlayer?: number
  m_speedUnitsSecondaryPlayer?: number
  m_temperatureUnitsSecondaryPlayer?: number
  m_numSafetyCarPeriods?: number
  m_numVirtualSafetyCarPeriods?: number
  m_numRedFlagPeriods?: number
  m_equalCarPerformance?: number
  m_recoveryMode?: number
  m_flashbackLimit?: number
  m_surfaceType?: number
  m_lowFuelMode?: number
  m_raceStarts?: number
  m_tyreTemperature?: number
  m_pitLaneTyreSim?: number
  m_carDamage?: number
  m_carDamageRate?: number
  m_collisions?: number
  m_collisionsOffForFirstLapOnly?: number
  m_mpUnsafePitRelease?: number
  m_mpOffForGriefing?: number
  m_cornerCuttingStringency?: number
  m_parcFermeRules?: number
  m_pitStopExperience?: number
  m_safetyCar?: number
  m_safetyCarExperience?: number
  m_formationLap?: number
  m_formationLapExperience?: number
  m_redFlags?: number
  m_affectsLicenceLevelSolo?: number
  m_affectsLicenceLevelMP?: number
  m_numSessionsInWeekend?: number
  m_weekendStructure?: number[]
  m_sector2LapDistanceStart?: number
  m_sector3LapDistanceStart?: number
}

export interface MarshalZone {
  m_zoneStart: number
  m_zoneFlag: number
}

export interface LapData {
  m_bestLapNum?: number
  m_bestLapSector1TimeInMS?: number
  m_bestLapSector2TimeInMS?: number
  m_bestLapSector3TimeInMS?: number
  m_bestOverallSector1TimeInMS?: number
  m_bestOverallSector1LapNum?: number
  m_bestOverallSector2TimeInMS?: number
  m_bestOverallSector2LapNum?: number
  m_bestOverallSector3TimeInMS?: number
  m_bestOverallSector3LapNum?: number
  m_lastLapTime?: number
  m_lastLapTimeInMS?: number
  m_currentLapTime?: number
  m_currentLapTimeInMS?: number
  m_bestLapTime?: number
  m_sector1Time?: number
  m_sector1TimeInMS?: number
  m_sector1TimeMinutes?: number
  m_sector2Time?: number
  m_sector2TimeInMS?: number
  m_sector2TimeMinutes?: number
  m_deltaToCarInFrontInMS?: number
  m_deltaToCarInFrontMinutes?: number
  m_deltaToRaceLeaderInMS?: number
  m_deltaToRaceLeaderMinutes?: number
  m_lapDistance: number
  m_totalDistance: number
  m_safetyCarDelta: number
  m_carPosition: number
  m_currentLapNum: number
  m_pitStatus: number
  m_numPitStops?: number
  m_sector: number
  m_currentLapInvalid: number
  m_penalties: number
  m_warnings?: number
  m_totalWarnings?: number
  m_cornerCuttingWarnings?: number
  m_numUnservedDriveThroughPens?: number
  m_numUnservedStopGoPens?: number
  m_gridPosition: number
  m_driverStatus: number
  m_resultStatus: number
  m_pitLaneTimerActive?: number
  m_pitLaneTimeInLaneInMS?: number
  m_pitStopTimerInMS?: number
  m_pitStopShouldServePen?: number
  m_speedTrapFastestSpeed?: number
  m_speedTrapFastestLap?: number
}

export interface PacketCarDamageData extends PacketBase {
  m_carDamageData: CarDamageData[]
}

export enum FaultStatus {
  OK = 0,
  Fault = 1,
}

export interface CarDamageData {
  m_tyresWear: number[]
  m_tyresDamage: number[]
  m_brakesDamage: number[]
  m_tyreBlisters?: number[]
  m_frontLeftWingDamage: number
  m_frontRightWingDamage: number
  m_rearWingDamage: number
  m_floorDamage: number
  m_diffuserDamage: number
  m_sidepodDamage: number
  m_drsFault: FaultStatus
  m_ersFault: FaultStatus
  m_gearBoxDamage: number
  m_engineDamage: number
  m_engineMGUHWear: number
  m_engineESWear: number
  m_engineCEWear: number
  m_engineICEWear: number
  m_engineMGUKWear: number
  m_engineTCWear: number
  m_engineBlown: FaultStatus
  m_engineSeized: FaultStatus
}

export interface PacketCarStatusData extends PacketBase {
  m_carStatusData: CarStatusData[]
}

export enum TractionControl {
  Off = 0,
  Medium = 1,
  Full = 2,
}

export enum AntiLockBrakes {
  Off = 0,
  On = 1,
}

export enum FuelMix {
  Lean = 0,
  Standard = 1,
  Rich = 2,
  Max = 3,
}

export enum PitLimiterStatus {
  Off = 0,
  On = 1,
}

export enum DRSAllowed {
  NotAllowed = 0,
  Allowed = 1,
}

export enum VehicleFIAFlags {
  Invalid = -1,
  None = 0,
  Green = 1,
  Blue = 2,
  Yellow = 3,
}

export enum ERSDeployMode {
  None = 0,
  Medium = 1,
  Hotlap = 2,
  Overtake = 3,
}

export enum NetworkPaused {
  NotPaused = 0,
  Paused = 1,
}

export enum ActualTyreCompound {
  Invalid = 0,
  C5 = 16,
  C4 = 17,
  C3 = 18,
  C2 = 19,
  C1 = 20,
  C0 = 21,
  Inter = 7,
  Wet = 8,
  DryClassic = 9,
  WetClassic = 10,
  SuperSoftF2 = 11,
  SoftF2 = 12,
  MediumF2 = 13,
  HardF2 = 14,
  WetF2 = 15,
}

export enum VisualTyreCompound {
  Invalid = 0,
  Soft = 16,
  Medium = 17,
  Hard = 18,
  Inter = 7,
  Wet = 8,
  DryClassic = 9,
  WetClassic = 10,
  WetF2_20 = 15,
  SuperSoftF2_20 = 19,
  SoftF2_20 = 20,
  MediumF2_20 = 21,
  HardF2_20 = 22,
}

export interface CarStatusData {
  m_tractionControl: TractionControl
  m_antiLockBrakes: AntiLockBrakes
  m_fuelMix: FuelMix
  m_frontBrakeBias: number
  m_pitLimiterStatus: PitLimiterStatus
  m_fuelInTank: number
  m_fuelCapacity: number
  m_maxRPM: number
  m_idleRPM: number
  m_maxGears: number
  m_drsAllowed: DRSAllowed
  m_drsActivationDistance?: number
  m_tyresWear?: number[]
  m_actualTyreCompound?: ActualTyreCompound
  m_visualTyreCompound?: VisualTyreCompound
  m_tyresAgeLaps?: number
  m_tyreCompound?: number
  m_tyresDamage?: number[]
  m_frontLeftWingDamage?: number
  m_frontRightWingDamage?: number
  m_rearWingDamage?: number
  m_drsFault?: number
  m_engineDamage?: number
  m_gearBoxDamage?: number
  m_exhaustDamage?: number
  m_vehicleFiaFlags: VehicleFIAFlags
  m_enginePowerICE?: number
  m_enginePowerMGUK?: number
  m_ersStoreEnergy: number
  m_ersDeployMode: ERSDeployMode | number // due to f1 2019
  m_ersHarvestedThisLapMGUK: number
  m_ersHarvestedThisLapMGUH: number
  m_ersDeployedThisLap: number
  m_fuelRemainingLaps?: number
  m_networkPaused?: NetworkPaused
}

export interface PacketCarSetupData extends PacketBase {
  m_carSetups: CarSetupData[]
  m_nextFrontWingValue?: number
}

export interface CarSetupData {
  m_frontWing: number
  m_rearWing: number
  m_onThrottle: number
  m_offThrottle: number
  m_frontCamber: number
  m_rearCamber: number
  m_frontToe: number
  m_rearToe: number
  m_frontSuspension: number
  m_rearSuspension: number
  m_frontAntiRollBar: number
  m_rearAntiRollBar: number
  m_frontSuspensionHeight: number
  m_rearSuspensionHeight: number
  m_brakePressure: number
  m_brakeBias: number
  m_engineBraking?: number
  m_rearLeftTyrePressure?: number
  m_rearRightTyrePressure?: number
  m_frontLeftTyrePressure?: number
  m_frontRightTyrePressure?: number
  m_frontTyrePressure?: number
  m_rearTyrePressure?: number
  m_ballast: number
  m_fuelLoad: number
}

export enum EventCode {
  SessionStarted = 'SSTA',
  SessionEnded = 'SEND',
  FastestLap = 'FTLP',
  Retirement = 'RTMT',
  DRSEnabled = 'DRSE',
  DRSDisabled = 'DRSD',
  TeamMateInPits = 'TMPT',
  ChequeredFlag = 'CHQF',
  RaceWinner = 'RCWN',
  Penalty = 'PENA',
  SpeedTrap = 'SPTP',
  StartLights = 'STLG',
  LightsOut = 'LGOT',
  DriveThroughServed = 'DTSV',
  StopGoServed = 'SGSV',
  Flashback = 'FLBK',
  ButtonStatus = 'BUTN',
  RedFlag = 'RDFL',
  Overtake = 'OVTK',
  SafetyCar = 'SCAR',
  Collision = 'COLL',
}

export interface GenericEvent extends PacketBase {
  m_eventStringCode: EventCode.SessionStarted | EventCode.LightsOut | EventCode.RedFlag | EventCode.SessionEnded | EventCode.DRSEnabled | EventCode.ChequeredFlag
}

export interface VehicleEvent extends PacketBase {
  m_eventStringCode: EventCode.Retirement | EventCode.TeamMateInPits | EventCode.RaceWinner | EventCode.DriveThroughServed
  m_eventDetails: VehicleEventDetails
}

export interface DRSDisabledEvent extends PacketBase {
  m_eventStringCode: EventCode.DRSDisabled
  m_eventDetails?: DRSDisabledEventDetails
}

export interface StopAndGoEvent extends PacketBase {
  m_eventStringCode: EventCode.StopGoServed
  m_eventDetails: StopGoPenaltyServedEventDetails
}

export interface SafetyCarEvent extends PacketBase {
  m_eventStringCode: EventCode.SafetyCar
  m_eventDetails: SafetyCarEventDetails
}

export interface CollisionEvent extends PacketBase {
  m_eventStringCode: EventCode.Collision
  m_eventDetails: CollisionEventDetails
}

export interface FlashbackEvent extends PacketBase {
  m_eventStringCode: EventCode.Flashback
  m_eventDetails: FlashbackEventDetails
}

export interface PenaltyEvent extends PacketBase {
  m_eventStringCode: EventCode.Penalty
  m_eventDetails: PenaltyEventDetails
}

export interface SpeedTrapEvent extends PacketBase {
  m_eventStringCode: EventCode.SpeedTrap
  m_eventDetails: SpeedTrapEventDetails
}

export interface LightEvent extends PacketBase {
  m_eventStringCode: EventCode.StartLights
  m_eventDetails: LightEventDetails
}

export interface ButtonEvent extends PacketBase {
  m_eventStringCode: EventCode.ButtonStatus
  m_eventDetails: ButtonEventDetails
}

export interface FastestLapEvent extends PacketBase {
  m_eventStringCode: EventCode.FastestLap
  m_eventDetails: FastestLapEventDetails
}

export interface OvertakeEvent extends PacketBase {
  m_eventStringCode: EventCode.Overtake
  m_eventDetails: OvertakeEventDetails
}

export interface SpeedTrapEventDetails extends VehicleEventDetails {
  speed: number
  isOverallFastestInSession: number
  isDriverFastestInSession: number
  fastestVehicleIdxInSession: number
  fastestSpeedInSession: number
}

export interface VehicleEventDetails {
  vehicleIdx: number
}

export interface StopGoPenaltyServedEventDetails extends VehicleEventDetails {
  stopTime?: number
}

export enum DRSDisabledReason {
  WetTrack = 0,
  SafetyCarDeployed = 1,
  RedFlag = 2,
  MinLapNotReached = 3,
}

export interface DRSDisabledEventDetails {
  reason?: DRSDisabledReason
}

export enum SafetyCarType {
  NoSafetyCar = 0,
  FullSafetyCar = 1,
  VirtualSafetyCar = 2,
  FormationLapSafetyCar = 3,
}

export enum SafetyCarEventType {
  Deployed = 0,
  Returning = 1,
  Returned = 2,
  ResumeRace = 3,
}

export interface SafetyCarEventDetails {
  safetyCarType: SafetyCarType
  eventType: SafetyCarEventType
}

export interface CollisionEventDetails {
  vehicle1Idx: number
  vehicle2Idx: number
}

export interface FlashbackEventDetails {
  flashbackSessionTime: number
  flashbackFrameIdentifier: number
}

export interface LightEventDetails {
  numLights: number
}

export interface ButtonEventDetails {
  buttonStatus: number
}

export interface FastestLapEventDetails extends VehicleEventDetails {
  lapTime: number
}

export enum RetirementReason {
  Invalid = 0,
  Retired = 1,
  Finished = 2,
  TerminalDamage = 3,
  Inactive = 4,
  NotEnoughLapsCompleted = 5,
  BlackFlagged = 6,
  RedFlagged = 7,
  MechanicalFailure = 8,
  SessionSkipped = 9,
  SessionSimulated = 10,
}

export interface RetirementEventDetails extends VehicleEventDetails {
  reason?: RetirementReason
}

export interface RetirementEvent extends PacketBase {
  m_eventStringCode: EventCode.Retirement
  m_eventDetails: RetirementEventDetails
}

export interface OvertakeEventDetails {
  beingOvertakenVehicleIdx: number
  overtakingVehicleIdx: number
}

export interface PenaltyEventDetails extends VehicleEventDetails {
  penaltyType: number
  infringementType: number
  otherVehicleIdx: number
  time: number
  lapNum: number
  placesGained: number
}

export interface PacketParticipantsData extends PacketBase {
  m_numCars?: number
  m_numActiveCars?: number
  m_participants: ParticipantData[]
}

export interface PacketCarTelemetryData extends PacketBase {
  m_carTelemetryData: CarTelemetryData[]
  m_buttonStatus?: number
  m_mfdPanelIndex?: number
  m_mfdPanelIndexSecondaryPlayer?: number
  m_suggestedGear?: number
}

export interface CarTelemetryData {
  m_speed: number
  m_throttle: number
  m_steer: number
  m_brake: number
  m_clutch: number
  m_gear: number
  m_tyresPressure: number[]
  m_brakesTemperature: number[]
  m_tyresSurfaceTemperature: number[]
  m_tyresInnerTemperature: number[]
  m_engineRPM: number
  m_drs: number
  m_revLightsPercent: number
  m_revLightsBitValue?: number
  m_engineTemperature: number
  m_surfaceType?: number[]
}

export interface LiveryColour {
  red: number
  green: number
  blue: number
}

export enum Platform {
  Invalid = 0,
  Steam = 1,
  PlayStation = 3,
  Xbox = 4,
  Origin = 6,
  Unknown = 255,
}

export enum TelemetryStatus {
  Restricted = 0,
  Public = 1,
}

export enum OnlineNamesStatus {
  Off = 0,
  On = 1,
}

export enum ReadyStatus {
  NotReady = 0,
  Ready = 1,
  Spectating = 2,
}

export interface ParticipantData {
  m_aiControlled: number
  m_driverId: number
  m_networkId?: number
  m_name: string
  m_nationality: number
  m_raceNumber: number
  m_teamId: number
  m_myTeam?: number
  m_yourTelemetry?: TelemetryStatus
  m_showOnlineNames?: OnlineNamesStatus
  m_platform?: Platform
  m_techLevel?: number
  m_numColours?: number
  m_liveryColours?: LiveryColour[]
}

export interface WeatherForecastSample {
  m_sessionType: number
  m_timeOffset: number
  m_weather: number
  m_trackTemperature: number
  m_trackTemperatureChange?: number
  m_airTemperature: number
  m_airTemperatureChange?: number
  m_rainPercentage?: number
}

export enum ResultStatus {
  Invalid = 0,
  Inactive = 1,
  Active = 2,
  Finished = 3,
  DidNotFinish = 4,
  Disqualified = 5,
  NotClassified = 6,
  Retired = 7,
}

export enum ResultReason {
  Invalid = 0,
  Retired = 1,
  Finished = 2,
  TerminalDamage = 3,
  Inactive = 4,
  NotEnoughLapsCompleted = 5,
  BlackFlagged = 6,
  RedFlagged = 7,
  MechanicalFailure = 8,
  SessionSkipped = 9,
  SessionSimulated = 10,
}

export interface FinalClassificationData {
  m_position: number
  m_numLaps: number
  m_gridPosition: number
  m_points: number
  m_numPitStops: number
  m_resultStatus: ResultStatus
  m_resultReason?: ResultReason
  // check why missing?
  m_bestLapTime?: number
  m_bestLapTimeInMS?: number
  m_totalRaceTime: number
  m_penaltiesTime: number
  m_numPenalties: number
  m_numTyreStints: number
  m_tyreStintsActual: number[]
  m_tyreStintsVisual: number[]
  m_tyreStintsEndLaps?: number[]
}

export interface PacketFinalClassificationData extends PacketBase {
  m_numCars: number
  m_classificationData: FinalClassificationData[]
}

export interface PacketLapPositionsData extends PacketBase {
  m_numLaps: number
  m_lapStart: number
  m_positionForVehicleIdx: number[][]
}

export interface LobbyInfoData {
  m_aiControlled: number
  m_teamId: number
  m_nationality: number
  m_platform: number
  m_name: string
  m_carNumber: number
  m_yourTelemetry: TelemetryStatus
  m_showOnlineNames: OnlineNamesStatus
  m_techLevel: number
  m_readyStatus: ReadyStatus
}

export interface PacketLobbyInfoData extends PacketBase {
  m_numPlayers: number
  m_lobbyPlayers: LobbyInfoData[]
}

export interface LapHistoryData {
  m_lapTimeInMS: number
  m_sector1TimeInMS: number
  m_sector1TimeMinutes?: number
  m_sector2TimeInMS: number
  m_sector2TimeMinutes?: number
  m_sector3TimeInMS: number
  m_sector3TimeMinutes?: number
  m_lapValidBitFlags: number
}

export interface TyreStintsHistoryData {
  m_endLap: number
  m_tyreActualCompound: number
  m_tyreVisualCompound: number
}

export interface PacketSessionHistoryData extends PacketBase {
  m_carIdx: number
  m_numLaps: number
  m_numTyreStints: number
  m_bestLapTimeLapNum: number
  m_bestSector1LapNum: number
  m_bestSector2LapNum: number
  m_bestSector3LapNum: number
  m_lapHistoryData: LapHistoryData[]
  m_tyreStintsHistoryData: TyreStintsHistoryData[]
}

export interface TyreSetData {
  m_actualTyreCompound: number
  m_visualTyreCompound: number
  m_wear: number
  m_available: number
  m_recommendedSession: number
  m_lifeSpan: number
  m_usableLife: number
  m_lapDeltaTime: number
  m_fitted: number
}

export interface PacketTyreSetsData extends PacketBase {
  m_carIdx: number
  m_tyreSetData: TyreSetData[]
  m_fittedIdx: number
}

export enum AssistStatus {
  Off = 0,
  On = 1,
}

export enum CarPerformanceStatus {
  Realistic = 0,
  Equal = 1,
}

export enum CustomSetupStatus {
  No = 0,
  Yes = 1,
}

export enum ValidationStatus {
  Invalid = 0,
  Valid = 1,
}

export interface TimeTrialDataSet {
  m_carIdx: number
  m_teamId: number
  m_lapTimeInMS: number
  m_sector1TimeInMS: number
  m_sector2TimeInMS: number
  m_sector3TimeInMS: number
  m_tractionControl: AssistStatus
  m_gearboxAssist: AssistStatus
  m_antiLockBrakes: AssistStatus
  m_equalCarPerformance: CarPerformanceStatus
  m_customSetup: CustomSetupStatus
  m_valid: ValidationStatus
}

export interface PacketTimeTrialData extends PacketBase {
  m_playerSessionBestDataSet: TimeTrialDataSet
  m_personalBestDataSet: TimeTrialDataSet
  m_rivalDataSet: TimeTrialDataSet
}

export type PacketEvent =
  | GenericEvent
  | LightEvent
  | ButtonEvent
  | VehicleEvent
  | DRSDisabledEvent
  | StopAndGoEvent
  | RetirementEvent
  | OvertakeEvent
  | PenaltyEvent
  | FlashbackEvent
  | FastestLapEvent
  | SpeedTrapEvent
  | SafetyCarEvent
  | CollisionEvent

export type Packet =
  | PacketSessionHistoryData
  | PacketSessionData
  | PacketMotionData
  | PacketLapData
  | PacketEvent
  | PacketParticipantsData
  | PacketCarSetupData
  | PacketCarTelemetryData
  | PacketCarStatusData
  | PacketCarDamageData
  | PacketFinalClassificationData
  | PacketLobbyInfoData
  | PacketTyreSetsData
  | PacketMotionExData
  | PacketTimeTrialData
