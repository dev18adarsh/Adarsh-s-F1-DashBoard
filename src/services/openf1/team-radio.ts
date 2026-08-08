import { getOpenF1 } from './base'

import type { OpenF1RadioMessage, RadioFilters } from '@/types'

export async function fetchRadioMessages(
  filters: RadioFilters = {},
): Promise<OpenF1RadioMessage[]> {
  return getOpenF1<OpenF1RadioMessage>('/team_radio', filters)
}
