import type { Race } from '@/types'

export function isRaceCompleted(race: Race): boolean {
  return new Date(`${race.date}T00:00:00`) < new Date()
}
