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
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
          <div
            className="flex size-9 items-center justify-center rounded-lg"
            style={{ backgroundColor: accent ? `${accent}22` : undefined, color: accent }}
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
