import { useOpenF1Query, type UseOpenF1Options } from '@/hooks/use-openf1'
import type { OpenF1RadioMessage, RadioFilters } from '@/types'

export function useRadioMessages(filters: RadioFilters = {}, options?: UseOpenF1Options) {
  return useOpenF1Query<OpenF1RadioMessage>('/team_radio', filters, options)
}
