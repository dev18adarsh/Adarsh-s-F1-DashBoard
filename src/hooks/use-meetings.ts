import { useOpenF1Query, type UseOpenF1Options } from '@/hooks/use-openf1'
import type { MeetingFilters, OpenF1Meeting } from '@/types'

export function useMeetings(filters: MeetingFilters = {}, options?: UseOpenF1Options) {
  return useOpenF1Query<OpenF1Meeting>('/meetings', filters, options)
}
