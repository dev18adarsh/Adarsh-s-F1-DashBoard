import { useQuery } from '@tanstack/react-query'

import { fetchDriverStandings } from '@/services'
import { f1Keys, STALE_TIME } from '@/hooks/f1-query-keys'

export function useDriverStandings(year = new Date().getFullYear()) {
  return useQuery({
    queryKey: f1Keys.driverStandings(year),
    queryFn: () => fetchDriverStandings(year),
    staleTime: STALE_TIME,
  })
}
