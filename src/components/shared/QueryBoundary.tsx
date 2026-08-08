import type { ReactNode } from 'react'

import { ErrorState } from '@/components/ui/error-state'

interface QueryBoundaryProps {
  isLoading: boolean
  isError: boolean
  error?: Error | null
  skeleton?: ReactNode
  retry?: () => void
  children: ReactNode
}

export function QueryBoundary({
  isLoading,
  isError,
  error,
  skeleton,
  retry,
  children,
}: QueryBoundaryProps) {
  if (isLoading && skeleton) {
    return skeleton
  }

  if (isError) {
    return <ErrorState error={error} retry={retry} />
  }

  return children
}
