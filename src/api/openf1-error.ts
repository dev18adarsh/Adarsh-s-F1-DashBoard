export class OpenF1Error extends Error {
  readonly status: number | null
  readonly retryAfter: number | null
  readonly isRateLimit: boolean

  constructor(message: string, status: number | null = null, retryAfter: number | null = null) {
    super(message)
    this.name = 'OpenF1Error'
    this.status = status
    this.retryAfter = retryAfter
    this.isRateLimit = status === 429
  }
}
