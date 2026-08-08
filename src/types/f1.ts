export interface Race {
  round: number
  meetingKey: number
  sessionKey: number
  raceName: string
  officialName: string
  circuitName: string
  location: string
  country: string
  countryCode: string
  countryFlag?: string | null
  date: string
  dateEnd: string
  hasSprint: boolean
}

export interface DriverStanding {
  position: number
  points: number
  wins: number
  driverNumber: number
  fullName: string
  firstName: string
  lastName: string
  acronym: string
  headshotUrl?: string | null
  teamName: string
  teamColour: string
}

export interface ConstructorStanding {
  position: number
  points: number
  wins: number
  teamName: string
  teamColour: string
}

export type RaceResultStatus = 'Finished' | 'DNF' | 'DNS' | 'DSQ'

export interface RaceResult {
  position: number | null
  driverNumber: number
  fullName: string
  firstName: string
  lastName: string
  acronym: string
  headshotUrl?: string | null
  teamName: string
  teamColour: string
  grid?: number
  laps: number
  points: number
  status: RaceResultStatus
  gapToLeader: number | string | null
}

export interface RaceResultData {
  race: Race
  results: RaceResult[]
}

export interface StandingsResponse<T> {
  season: number
  round: number
  standings: T[]
}
