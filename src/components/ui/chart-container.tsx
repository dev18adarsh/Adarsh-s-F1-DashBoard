import type { ReactNode } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ChartContainerProps extends React.ComponentProps<typeof Card> {
  title: string
  description?: string
  action?: ReactNode
  height?: number
  children: ReactNode
}

export function ChartContainer({
  title,
  description,
  action,
  height = 300,
  children,
  className,
  ...props
}: ChartContainerProps) {
  return (
    <Card className={cn('h-full', className)} {...props}>
      <CardHeader className="flex-row items-start justify-between gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>{title}</CardTitle>
          {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
        </div>
        {action}
      </CardHeader>
      <CardContent>
        <div className="w-full" style={{ height }}>
          {children}
        </div>
      </CardContent>
    </Card>
  )
}
