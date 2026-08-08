import { getOpenF1 } from './base'

import type { OpenF1SessionResult, SessionResultFilters } from '@/types'

export async function fetchSessionResults(
  filters: SessionResultFilters = {},
): Promise<OpenF1SessionResult[]> {
  return getOpenF1<OpenF1SessionResult>('/session_result', filters)
}
