import { useQuery } from '@tanstack/react-query'

import { fetchConstructorStandings } from '@/services'
import { f1Keys, STALE_TIME } from '@/hooks/f1-query-keys'

export function useConstructorStandings() {
  return useQuery({
    queryKey: f1Keys.constructorStandings(),
    queryFn: fetchConstructorStandings,
    staleTime: STALE_TIME,
  })
}
