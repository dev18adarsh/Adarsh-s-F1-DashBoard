import { useOpenF1Query, type UseOpenF1Options } from '@/hooks/use-openf1'
import type { CarDataFilters, OpenF1CarData } from '@/types'

export function useTelemetry(filters: CarDataFilters = {}, options?: UseOpenF1Options) {
  return useOpenF1Query<OpenF1CarData>('/car_data', filters, options)
}
