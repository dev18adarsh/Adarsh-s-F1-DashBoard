import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '@/utils'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      role="status"
      className={cn(
        'flex flex-col items-center justify-center gap-4 px-6 py-12 text-center',
        className,
      )}
    >
      <div className="relative">
        <div
          className="absolute inset-0 scale-[1.8] rounded-full bg-primary/20 blur-2xl"
          aria-hidden="true"
        />
        <div className="relative flex size-14 items-center justify-center rounded-2xl border border-border bg-card/70 text-primary shadow-soft backdrop-blur-xl">
          <Icon className="size-6" />
        </div>
      </div>
      <div className="space-y-1">
        <p className="font-semibold">{title}</p>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {action}
    </div>
  )
}
