import { useQuery } from '@tanstack/react-query'

import { fetchRaceResults } from '@/services'
import { f1Keys, STALE_TIME } from '@/hooks/f1-query-keys'

export function useRaceResults(sessionKey: number, enabled = true) {
  return useQuery({
    queryKey: f1Keys.raceResults(sessionKey),
    queryFn: () => fetchRaceResults(sessionKey),
    enabled: enabled && Number.isFinite(sessionKey) && sessionKey > 0,
    staleTime: STALE_TIME,
  })
}
