import { useOpenF1Query, type UseOpenF1Options } from '@/hooks/use-openf1'
import type { OpenF1Session, SessionFilters } from '@/types'

export function useSessions(filters: SessionFilters = {}, options?: UseOpenF1Options) {
  return useOpenF1Query<OpenF1Session>('/sessions', filters, options)
}
