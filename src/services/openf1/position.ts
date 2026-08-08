import { getOpenF1 } from './base'

import type { OpenF1Position, PositionFilters } from '@/types'

export async function fetchPositions(filters: PositionFilters = {}): Promise<OpenF1Position[]> {
  return getOpenF1<OpenF1Position>('/position', filters)
}
