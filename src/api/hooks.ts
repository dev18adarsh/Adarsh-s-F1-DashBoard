import { useQuery } from '@tanstack/react-query'

import {
  fetchConstructorStandings,
  fetchDriverStandings,
  fetchRaceResults,
  fetchRaceSchedule,
} from '@/api/f1'

export const f1Keys = {
  all: ['f1'] as const,
  schedule: () => [...f1Keys.all, 'schedule'] as const,
  driverStandings: () => [...f1Keys.all, 'driver-standings'] as const,
  constructorStandings: () => [...f1Keys.all, 'constructor-standings'] as const,
  raceResults: (round: string) => [...f1Keys.all, 'race-results', round] as const,
}

const STALE_TIME = 1000 * 60 * 5

export function useRaceSchedule() {
  return useQuery({
    queryKey: f1Keys.schedule(),
    queryFn: fetchRaceSchedule,
    staleTime: STALE_TIME,
  })
}

export function useDriverStandings() {
  return useQuery({
    queryKey: f1Keys.driverStandings(),
    queryFn: fetchDriverStandings,
    staleTime: STALE_TIME,
  })
}

export function useConstructorStandings() {
  return useQuery({
    queryKey: f1Keys.constructorStandings(),
    queryFn: fetchConstructorStandings,
    staleTime: STALE_TIME,
  })
}

export function useRaceResults(round: string, enabled = true) {
  return useQuery({
    queryKey: f1Keys.raceResults(round),
    queryFn: () => fetchRaceResults(round),
    enabled,
    staleTime: STALE_TIME,
  })
}
