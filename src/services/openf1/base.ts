import { openf1Client } from '@/api'
import type { OpenF1Query } from '@/types'

export async function getOpenF1<T>(endpoint: string, params: OpenF1Query = {}): Promise<T[]> {
  const { data } = await openf1Client.get<T[]>(endpoint, { params })
  return data
}
