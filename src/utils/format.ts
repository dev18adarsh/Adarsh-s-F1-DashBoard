function toDate(value: string): Date {
  return value.includes('T') ? new Date(value) : new Date(`${value}T00:00:00`)
}

export function formatDate(isoDate: string, opts?: Intl.DateTimeFormatOptions): string {
  return toDate(isoDate).toLocaleDateString(
    'en-GB',
    opts ?? {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    },
  )
}

export function formatShortDate(isoDate: string): string {
  return toDate(isoDate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  })
}

export function fullName(givenName: string, familyName: string): string {
  return `${givenName} ${familyName}`
}

export function initials(givenName: string, familyName: string): string {
  return `${givenName.charAt(0)}${familyName.charAt(0)}`.toUpperCase()
}

export function toNumber(value: string): number {
  return Number(value)
}

export function timeUntil(targetIso: string): string {
  const target = new Date(targetIso).getTime()
  const now = Date.now()
  const diff = target - now

  if (diff <= 0) return 'Completed'

  const days = Math.floor(diff / 86_400_000)
  if (days > 0) return `in ${days} day${days === 1 ? '' : 's'}`
  const hours = Math.floor(diff / 3_600_000)
  if (hours > 0) return `in ${hours} hour${hours === 1 ? '' : 's'}`
  const minutes = Math.floor(diff / 60_000)
  return `in ${minutes} minute${minutes === 1 ? '' : 's'}`
}
