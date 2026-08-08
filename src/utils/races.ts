import type { Race } from '@/types'

export function isRaceCompleted(race: Race): boolean {
  return new Date(race.dateEnd).getTime() < Date.now()
}
