import { getOpenF1 } from './base'

import type { LapFilters, OpenF1Lap } from '@/types'

export async function fetchLaps(filters: LapFilters = {}): Promise<OpenF1Lap[]> {
  return getOpenF1<OpenF1Lap>('/laps', filters)
}
