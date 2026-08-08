import { useOpenF1Query, type UseOpenF1Options } from '@/hooks/use-openf1'
import type { LapFilters, OpenF1Lap } from '@/types'

export function useLaps(filters: LapFilters = {}, options?: UseOpenF1Options) {
  return useOpenF1Query<OpenF1Lap>('/laps', filters, options)
}
