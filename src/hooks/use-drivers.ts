import { useOpenF1Query, type UseOpenF1Options } from '@/hooks/use-openf1'
import type { DriverFilters, OpenF1Driver } from '@/types'

export function useDrivers(filters: DriverFilters = {}, options?: UseOpenF1Options) {
  return useOpenF1Query<OpenF1Driver>('/drivers', filters, options)
}
