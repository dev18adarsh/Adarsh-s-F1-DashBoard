import { getOpenF1 } from './base'

import type { CarDataFilters, OpenF1CarData } from '@/types'

export async function fetchCarData(filters: CarDataFilters = {}): Promise<OpenF1CarData[]> {
  return getOpenF1<OpenF1CarData>('/car_data', filters)
}
