import axios from 'axios'

import { OpenF1Error } from './openf1-error'

const BASE_URL =
  import.meta.env.VITE_OPENF1_BASE_URL ?? 'https://api.openf1.org/v1'

const MAX_CONCURRENT_REQUESTS = 3

let activeRequests = 0
const pendingRequests: Array<() => void> = []

function acquire(): Promise<void> {
  if (activeRequests < MAX_CONCURRENT_REQUESTS) {
    activeRequests += 1
    return Promise.resolve()
  }
  return new Promise<void>((resolve) => {
    pendingRequests.push(resolve)
  })
}

function release(): void {
  activeRequests = Math.max(0, activeRequests - 1)
  const next = pendingRequests.shift()
  if (next) {
    activeRequests += 1
    next()
  }
}

export const openf1Client = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: 'application/json' },
  timeout: 15_000,
  paramsSerializer: { indexes: null },
})

openf1Client.interceptors.request.use(async (config) => {
  await acquire()
  return config
})

openf1Client.interceptors.response.use(
  (response) => {
    release()
    return response
  },
  (error) => {
    release()
    const status = axios.isAxiosError(error) ? (error.response?.status ?? null) : null

    if (status === 429) {
      const raw = error.response?.headers?.['retry-after']
      const parsed = raw != null ? Number(raw) : Number.NaN
      const retryAfter = Number.isFinite(parsed) && parsed > 0 ? parsed : null
      return Promise.reject(
        new OpenF1Error(
          'OpenF1 is temporarily rate-limiting requests. Retrying shortly…',
          status,
          retryAfter,
        ),
      )
    }

    if (status != null) {
      return Promise.reject(
        new OpenF1Error(`OpenF1 request failed with status ${status}`, status),
      )
    }

    return Promise.reject(
      new OpenF1Error(
        'Unable to reach the OpenF1 data service. Check your connection and try again.',
      ),
    )
  },
)
