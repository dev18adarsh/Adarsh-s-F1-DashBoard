import { useQuery } from '@tanstack/react-query'

import { STALE_TIME } from '@/hooks/f1-query-keys'
import { openf1Keys } from '@/hooks/openf1-query-keys'
import { getOpenF1 } from '@/services'
import type { OpenF1Query } from '@/types'

export interface UseOpenF1Options {
  enabled?: boolean
  staleTime?: number
  refetchInterval?: number | false
  retry?: number | boolean
}

export function useOpenF1Query<T>(
  endpoint: string,
  params: OpenF1Query = {},
  options: UseOpenF1Options = {},
) {
  return useQuery({
    queryKey: openf1Keys.query(endpoint, params),
    queryFn: () => getOpenF1<T>(endpoint, params),
    staleTime: options.staleTime ?? STALE_TIME,
    enabled: options.enabled ?? true,
    refetchInterval: options.refetchInterval,
    retry: options.retry ?? 2,
  })
}
