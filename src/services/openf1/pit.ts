import { getOpenF1 } from './base'

import type { OpenF1PitStop, PitStopFilters } from '@/types'

export async function fetchPitStops(filters: PitStopFilters = {}): Promise<OpenF1PitStop[]> {
  return getOpenF1<OpenF1PitStop>('/pit', filters)
}
