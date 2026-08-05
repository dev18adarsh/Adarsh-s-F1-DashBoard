import { Link } from 'react-router-dom'
import { CalendarDays, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { formatDate } from '@/lib/format'
import { isRaceCompleted } from '@/lib/races'
import { cn } from '@/lib/utils'
import type { Race } from '@/api/types'

interface RaceCardProps {
  race: Race
  index?: number
}

export function RaceCard({ race, index = 0 }: RaceCardProps) {
  const completed = isRaceCompleted(race)
  const sprint = Boolean(race.Sprint)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
    >
      <Link to={`/races/${race.round}`} className="group block h-full">
        <Card className="h-full transition-colors group-hover:border-primary/50">
          <CardContent className="flex h-full flex-col gap-4 py-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  Round {race.round}
                </span>
                {sprint ? (
                  <Badge variant="secondary" className="uppercase">
                    Sprint
                  </Badge>
                ) : null}
              </div>
              <Badge variant={completed ? 'outline' : 'default'}>
                {completed ? 'Completed' : 'Upcoming'}
              </Badge>
            </div>

            <div className="flex flex-1 flex-col gap-3">
              <h3 className="text-lg leading-snug font-bold transition-colors group-hover:text-primary">
                {race.raceName}
              </h3>
              <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <MapPin className="size-4" />
                  {race.Circuit.circuitName}
                </span>
                <span className="flex items-center gap-2">
                  <CalendarDays className="size-4" />
                  {formatDate(race.date)}
                  <span className="text-muted-foreground/70">
                    · {race.Circuit.Location.locality}, {race.Circuit.Location.country}
                  </span>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {completed ? 'View results' : 'Preview'}
              </span>
              <span
                className={cn('text-sm font-semibold text-primary', !completed && 'opacity-80')}
              >
                {completed ? 'Results' : 'Upcoming'}
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
