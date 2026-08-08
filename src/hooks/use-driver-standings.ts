import { useQuery } from '@tanstack/react-query'

import { fetchDriverStandings } from '@/services'
import { f1Keys, STALE_TIME } from '@/hooks/f1-query-keys'

export function useDriverStandings() {
  return useQuery({
    queryKey: f1Keys.driverStandings(),
    queryFn: fetchDriverStandings,
    staleTime: STALE_TIME,
  })
}
