export const STALE_TIME = 1000 * 60 * 5

export const f1Keys = {
  all: ['f1'] as const,
  schedule: () => [...f1Keys.all, 'schedule'] as const,
  driverStandings: () => [...f1Keys.all, 'driver-standings'] as const,
  constructorStandings: () => [...f1Keys.all, 'constructor-standings'] as const,
  raceResults: (round: string) => [...f1Keys.all, 'race-results', round] as const,
}
