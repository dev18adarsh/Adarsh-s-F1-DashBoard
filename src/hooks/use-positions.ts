import { useOpenF1Query, type UseOpenF1Options } from '@/hooks/use-openf1'
import type { OpenF1Position, PositionFilters } from '@/types'

export function usePositions(filters: PositionFilters = {}, options?: UseOpenF1Options) {
  return useOpenF1Query<OpenF1Position>('/position', filters, options)
}
