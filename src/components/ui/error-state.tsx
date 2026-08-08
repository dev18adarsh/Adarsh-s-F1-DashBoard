import { AlertTriangle, RefreshCw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/utils'

interface ErrorStateProps {
  title?: string
  description?: string
  error?: Error | null
  retry?: () => void
  className?: string
}

export function ErrorState({
  title = 'Failed to load data',
  description,
  error,
  retry,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center gap-4 px-6 py-12 text-center',
        className,
      )}
    >
      <div className="relative">
        <div
          className="absolute inset-0 scale-[1.8] rounded-full bg-destructive/20 blur-2xl"
          aria-hidden="true"
        />
        <div className="relative flex size-14 items-center justify-center rounded-2xl border border-border bg-card/70 text-destructive shadow-soft backdrop-blur-xl">
          <AlertTriangle className="size-6" />
        </div>
      </div>
      <div className="space-y-1">
        <p className="font-semibold">{title}</p>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : error?.message ? (
          <p className="text-sm text-muted-foreground">{error.message}</p>
        ) : (
          <p className="text-sm text-muted-foreground">Something went wrong.</p>
        )}
      </div>
      {retry ? (
        <Button variant="outline" size="sm" onClick={retry} className="gap-2">
          <RefreshCw className="size-4" />
          Retry
        </Button>
      ) : null}
    </div>
  )
}
