import { apiClient } from './client'
import type {
  ConstructorStanding,
  DriverStanding,
  MRData,
  Race,
  RaceResult,
  RaceTablePayload,
  StandingsTablePayload,
} from './types'

async function getPayload<T>(url: string): Promise<T> {
  const { data } = await apiClient.get<MRData<T>>(url)
  return data.payload
}

export async function fetchRaceSchedule(): Promise<Race[]> {
  const payload = await getPayload<RaceTablePayload>('/current.json')
  return payload.Races
}

export interface StandingsResponse<T> {
  season: string
  round: string
  standings: T[]
}

export async function fetchDriverStandings(): Promise<StandingsResponse<DriverStanding>> {
  const payload = await getPayload<StandingsTablePayload>('/current/driverStandings.json')
  const list = payload.StandingsLists[0]
  return { season: list.season, round: list.round, standings: list.DriverStandings ?? [] }
}

export async function fetchConstructorStandings(): Promise<StandingsResponse<ConstructorStanding>> {
  const payload = await getPayload<StandingsTablePayload>('/current/constructorStandings.json')
  const list = payload.StandingsLists[0]
  return { season: list.season, round: list.round, standings: list.ConstructorStandings ?? [] }
}

export async function fetchRaceResults(
  round: string,
): Promise<{ race: Race; results: RaceResult[] }> {
  const payload = await getPayload<RaceTablePayload>(`/current/${round}/results.json`)
  const race = payload.Races[0]
  return { race, results: race.Results ?? [] }
}
