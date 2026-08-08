import { useQuery } from '@tanstack/react-query'

import { fetchRaceSchedule } from '@/services'
import { f1Keys, STALE_TIME } from '@/hooks/f1-query-keys'

export function useRaceSchedule(year = new Date().getFullYear()) {
  return useQuery({
    queryKey: f1Keys.schedule(year),
    queryFn: () => fetchRaceSchedule(year),
    staleTime: STALE_TIME,
  })
}
