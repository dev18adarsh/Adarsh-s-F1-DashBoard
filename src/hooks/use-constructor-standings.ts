import { useQuery } from '@tanstack/react-query'

import { fetchConstructorStandings } from '@/services'
import { f1Keys, STALE_TIME } from '@/hooks/f1-query-keys'

export function useConstructorStandings(year = new Date().getFullYear()) {
  return useQuery({
    queryKey: f1Keys.constructorStandings(year),
    queryFn: () => fetchConstructorStandings(year),
    staleTime: STALE_TIME,
  })
}
