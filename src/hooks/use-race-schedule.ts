import { useQuery } from '@tanstack/react-query'

import { fetchRaceSchedule } from '@/services'
import { f1Keys, STALE_TIME } from '@/hooks/f1-query-keys'

export function useRaceSchedule() {
  return useQuery({
    queryKey: f1Keys.schedule(),
    queryFn: fetchRaceSchedule,
    staleTime: STALE_TIME,
  })
}
