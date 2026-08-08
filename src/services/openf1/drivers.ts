import { getOpenF1 } from './base'

import type { DriverFilters, OpenF1Driver } from '@/types'

export async function fetchDrivers(filters: DriverFilters = {}): Promise<OpenF1Driver[]> {
  return getOpenF1<OpenF1Driver>('/drivers', filters)
}
