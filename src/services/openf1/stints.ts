import { getOpenF1 } from './base'

import type { OpenF1Stint, StintFilters } from '@/types'

export async function fetchStints(filters: StintFilters = {}): Promise<OpenF1Stint[]> {
  return getOpenF1<OpenF1Stint>('/stints', filters)
}
