import { getOpenF1 } from './base'

import type { OpenF1StartingGrid, StartingGridFilters } from '@/types'

export async function fetchStartingGrid(
  filters: StartingGridFilters = {},
): Promise<OpenF1StartingGrid[]> {
  return getOpenF1<OpenF1StartingGrid>('/starting_grid', filters)
}
