import type { OpenF1Query } from '@/types'

export const openf1Keys = {
  all: ['openf1'] as const,
  query: (endpoint: string, params: OpenF1Query = {}) =>
    [...openf1Keys.all, endpoint, params] as const,
}
