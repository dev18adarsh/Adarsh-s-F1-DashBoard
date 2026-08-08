import { getOpenF1 } from './base'

import type { IntervalFilters, OpenF1Interval } from '@/types'

export async function fetchIntervals(filters: IntervalFilters = {}): Promise<OpenF1Interval[]> {
  return getOpenF1<OpenF1Interval>('/intervals', filters)
}
