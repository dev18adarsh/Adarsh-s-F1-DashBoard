import { useOpenF1Query, type UseOpenF1Options } from '@/hooks/use-openf1'
import type { OpenF1PitStop, PitStopFilters } from '@/types'

export function usePitStops(filters: PitStopFilters = {}, options?: UseOpenF1Options) {
  return useOpenF1Query<OpenF1PitStop>('/pit', filters, options)
}
