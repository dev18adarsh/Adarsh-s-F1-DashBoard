import { OpenF1Error } from './openf1-error'

export const MAX_QUERY_RETRIES = 2

export function shouldRetry(failureCount: number, error: Error): boolean {
  if (error instanceof OpenF1Error) {
    if (error.isRateLimit) return failureCount < MAX_QUERY_RETRIES
    if (error.status != null && error.status >= 500) return failureCount < MAX_QUERY_RETRIES
    if (error.status != null) return false
    return failureCount < 1
  }
  return failureCount < 1
}

export function retryDelay(attempt: number, error: Error): number {
  if (error instanceof OpenF1Error && error.isRateLimit) {
    if (error.retryAfter != null) return error.retryAfter * 1000
    return Math.min(1000 * 2 ** attempt, 30_000)
  }
  return Math.min(1000 * 2 ** attempt, 10_000)
}
