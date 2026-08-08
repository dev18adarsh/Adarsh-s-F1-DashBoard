import { getOpenF1 } from './base'

import type { MeetingFilters, OpenF1Meeting } from '@/types'

export async function fetchMeetings(filters: MeetingFilters = {}): Promise<OpenF1Meeting[]> {
  return getOpenF1<OpenF1Meeting>('/meetings', filters)
}
