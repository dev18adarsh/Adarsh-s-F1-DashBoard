import { useOpenF1Query, type UseOpenF1Options } from '@/hooks/use-openf1'
import type { IntervalFilters, OpenF1Interval } from '@/types'

export function useIntervals(filters: IntervalFilters = {}, options?: UseOpenF1Options) {
  return useOpenF1Query<OpenF1Interval>('/intervals', filters, options)
}
