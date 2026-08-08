import { getOpenF1 } from './base'

import type { OpenF1RaceControl, RaceControlFilters } from '@/types'

export async function fetchRaceControl(
  filters: RaceControlFilters = {},
): Promise<OpenF1RaceControl[]> {
  return getOpenF1<OpenF1RaceControl>('/race_control', filters)
}
