import { useQuery } from '@tanstack/react-query'

import { fetchRaceResults } from '@/services'
import { f1Keys, STALE_TIME } from '@/hooks/f1-query-keys'

export function useRaceResults(round: string, enabled = true) {
  return useQuery({
    queryKey: f1Keys.raceResults(round),
    queryFn: () => fetchRaceResults(round),
    enabled,
    staleTime: STALE_TIME,
  })
}
