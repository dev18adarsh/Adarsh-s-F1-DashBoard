import { useOpenF1Query, type UseOpenF1Options } from '@/hooks/use-openf1'
import type { OpenF1RaceControl, RaceControlFilters } from '@/types'

export function useRaceControl(filters: RaceControlFilters = {}, options?: UseOpenF1Options) {
  return useOpenF1Query<OpenF1RaceControl>('/race_control', filters, options)
}
