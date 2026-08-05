import type { ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

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
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="size-6" />
          </div>
          <div className="space-y-1">
            <p className="font-semibold">Failed to load data</p>
            <p className="text-sm text-muted-foreground">
              {error?.message ?? 'Something went wrong.'}
            </p>
          </div>
          {retry ? (
            <Button variant="outline" onClick={retry} className="gap-2">
              <RefreshCw className="size-4" />
              Retry
            </Button>
          ) : null}
        </CardContent>
      </Card>
    )
  }

  return children
}
