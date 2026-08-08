import { getOpenF1 } from './base'

import type { OpenF1Session, SessionFilters } from '@/types'

export async function fetchSessions(filters: SessionFilters = {}): Promise<OpenF1Session[]> {
  return getOpenF1<OpenF1Session>('/sessions', filters)
}
