import { openf1Client } from '@/api'
import type { OpenF1ParamValue, OpenF1Query } from '@/types'

const DEDUPE_TTL = 30_000

interface CacheEntry {
  data: unknown
  expiresAt: number
}

const completedCache = new Map<string, CacheEntry>()
const inFlightCache = new Map<string, Promise<unknown>>()

function normalizeParam(value: OpenF1ParamValue | undefined): unknown {
  if (Array.isArray(value)) {
    const sorted = [...value].sort((a, b) => String(a).localeCompare(String(b)))
    return sorted.length === 1 ? sorted[0] : sorted
  }
  return value
}

function serializeParams(params: OpenF1Query): string {
  return Object.keys(params)
    .sort()
    .map((key) => `${key}=${JSON.stringify(normalizeParam(params[key]))}`)
    .join('&')
}

function requestKey(endpoint: string, params: OpenF1Query): string {
  return `${endpoint}?${serializeParams(params)}`
}

export async function getOpenF1<T>(endpoint: string, params: OpenF1Query = {}): Promise<T[]> {
  const key = requestKey(endpoint, params)
  const now = Date.now()

  const cached = completedCache.get(key)
  if (cached && cached.expiresAt > now) {
    return cached.data as T[]
  }

  const inFlight = inFlightCache.get(key)
  if (inFlight) {
    return inFlight as Promise<T[]>
  }

  const request = openf1Client.get<T[]>(endpoint, { params }).then(
    (response) => {
      inFlightCache.delete(key)
      completedCache.set(key, { data: response.data, expiresAt: Date.now() + DEDUPE_TTL })
      return response.data
    },
    (error: unknown) => {
      inFlightCache.delete(key)
      throw error
    },
  )

  inFlightCache.set(key, request)
  return request
}
