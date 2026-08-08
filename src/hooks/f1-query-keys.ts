export const STALE_TIME = 1000 * 60 * 10
export const GC_TIME = 1000 * 60 * 60

export const f1Keys = {
  all: ['f1'] as const,
  schedule: (year: number) => [...f1Keys.all, 'schedule', year] as const,
  driverStandings: (year: number) => [...f1Keys.all, 'driver-standings', year] as const,
  constructorStandings: (year: number) => [...f1Keys.all, 'constructor-standings', year] as const,
  raceResults: (sessionKey: number) => [...f1Keys.all, 'race-results', sessionKey] as const,
}
