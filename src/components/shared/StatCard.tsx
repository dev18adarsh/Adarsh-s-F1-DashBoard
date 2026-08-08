import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface StatCardProps {
  label: string
  value: string
  hint?: string
  icon: LucideIcon
  accent?: string
}

export function StatCard({ label, value, hint, icon: Icon, accent }: StatCardProps) {
  const color = accent ?? '#e10600'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full">
        <div
          className="pointer-events-none absolute -top-14 -right-14 size-32 rounded-full opacity-20 blur-2xl"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
          <div
            className="flex size-10 items-center justify-center rounded-xl shadow-soft"
            style={{
              backgroundColor: `${color}1f`,
              color,
              boxShadow: `0 8px 24px -8px ${color}55`,
            }}
          >
            <Icon className="size-4" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {hint ? <p className="mt-1 text-sm text-muted-foreground">{hint}</p> : null}
        </CardContent>
      </Card>
    </motion.div>
  )
}
