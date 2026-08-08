export interface Driver {
  driverId: string
  permanentNumber: string
  code: string
  url: string
  givenName: string
  familyName: string
  dateOfBirth: string
  nationality: string
}

export interface Constructor {
  constructorId: string
  url: string
  name: string
  nationality: string
}

export interface Location {
  lat: string
  long: string
  locality: string
  country: string
}

export interface Circuit {
  circuitId: string
  url: string
  circuitName: string
  Location: Location
}

export interface Session {
  date: string
  time: string
}

export interface Race {
  season: string
  round: string
  url: string
  raceName: string
  Circuit: Circuit
  date: string
  time: string
  Sprint?: Session
  FirstPractice?: Session
  SecondPractice?: Session
  ThirdPractice?: Session
  Qualifying?: Session
  Results?: RaceResult[]
}

export interface DriverStanding {
  position: string
  positionText: string
  points: string
  wins: string
  Driver: Driver
  Constructors: Constructor[]
}

export interface ConstructorStanding {
  position: string
  positionText: string
  points: string
  wins: string
  Constructor: Constructor
}

export interface ResultTime {
  millis: string
  time: string
}

export interface FastestLap {
  rank: string
  lap: string
  Time: { time: string }
  AverageSpeed: { units: string; speed: string }
}

export interface RaceResult {
  number: string
  position: string
  positionText: string
  points: string
  Driver: Driver
  Constructor: Constructor
  grid: string
  laps: string
  status: string
  Time?: ResultTime
  FastestLap?: FastestLap
}

export interface MRData<T> {
  xmlns: string
  series: string
  url: string
  limit: string
  offset: string
  total: string
  payload: T
}

export interface RaceTablePayload {
  season: string
  round: string
  Races: Race[]
}

export interface StandingsList {
  season: string
  round: string
  DriverStandings?: DriverStanding[]
  ConstructorStandings?: ConstructorStanding[]
}

export interface StandingsTablePayload {
  season: string
  round: string
  StandingsLists: StandingsList[]
}

export interface StandingsResponse<T> {
  season: string
  round: string
  standings: T[]
}
