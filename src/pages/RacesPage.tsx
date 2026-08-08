import { useMemo } from 'react'
import { CalendarDays, Flag } from 'lucide-react'

import { useRaceSchedule } from '@/api/hooks'
import { PageHeader } from '@/components/shared/PageHeader'
import { QueryBoundary } from '@/components/shared/QueryBoundary'
import { RaceCardSkeleton } from '@/components/shared/skeletons'
import { EmptyState } from '@/components/ui/empty-state'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RaceCard } from '@/components/races/RaceCard'
import { isRaceCompleted } from '@/lib/races'

export function RacesPage() {
  const schedule = useRaceSchedule()

  const { completed, upcoming } = useMemo(() => {
    const races = schedule.data ?? []
    return {
      completed: races.filter(isRaceCompleted).reverse(),
      upcoming: races.filter((race) => !isRaceCompleted(race)),
    }
  }, [schedule.data])

  const season = schedule.data?.[0]?.season

  const skeleton = (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <RaceCardSkeleton key={i} />
      ))}
    </div>
  )

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Race Schedule"
        subtitle={season ? `${season} Formula One calendar` : 'Formula One calendar'}
      />

      <QueryBoundary
        isLoading={schedule.isLoading}
        isError={schedule.isError}
        error={schedule.error}
        retry={schedule.refetch}
        skeleton={skeleton}
      >
        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-4">
            {upcoming.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {upcoming.map((race, index) => (
                  <RaceCard key={race.round} race={race} index={index} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={CalendarDays}
                title="No upcoming races"
                description="The season is complete — check back next year."
              />
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-4">
            {completed.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {completed.map((race, index) => (
                  <RaceCard key={race.round} race={race} index={index} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Flag}
                title="No completed races yet"
                description="Race results will appear here as the season progresses."
              />
            )}
          </TabsContent>
        </Tabs>
      </QueryBoundary>
    </div>
  )
}
