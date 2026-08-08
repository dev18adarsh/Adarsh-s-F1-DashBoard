import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Flag, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

import { useRaceResults } from '@/api/hooks'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/empty-state'
import { PageHeader } from '@/components/shared/PageHeader'
import { QueryBoundary } from '@/components/shared/QueryBoundary'
import { TableSkeleton } from '@/components/shared/skeletons'
import { RaceResultsTable } from '@/components/races/RaceResultsTable'
import { fullName, formatDate } from '@/lib/format'
import { isRaceCompleted } from '@/lib/races'
import { teamColor } from '@/config/teams'

export function RaceDetailPage() {
  const { round } = useParams<{ round: string }>()

  const results = useRaceResults(round ?? '', Boolean(round))

  const race = results.data?.race
  const raceResults = results.data?.results ?? []
  const completed = race ? isRaceCompleted(race) : false
  const podium = raceResults.filter((result) => ['1', '2', '3'].includes(result.position))

  return (
    <div className="flex flex-col gap-8">
      <Button variant="ghost" size="sm" asChild className="w-fit gap-2">
        <Link to="/races">
          <ArrowLeft className="size-4" />
          Back to calendar
        </Link>
      </Button>

      <QueryBoundary
        isLoading={results.isLoading}
        isError={results.isError}
        error={results.error}
        retry={results.refetch}
        skeleton={<TableSkeleton rows={8} />}
      >
        {race ? (
          <>
            <PageHeader
              title={race.raceName}
              subtitle={`Round ${race.round} · ${race.Circuit.circuitName}`}
              action={
                <Badge variant={completed ? 'outline' : 'default'} className="w-fit">
                  {completed ? 'Completed' : 'Upcoming'}
                </Badge>
              }
            />

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-3"
            >
              <Card>
                <CardContent className="flex items-center gap-3 py-5">
                  <MapPin className="size-5 text-primary" />
                  <div className="leading-tight">
                    <p className="text-xs font-medium text-muted-foreground uppercase">Location</p>
                    <p className="font-semibold">
                      {race.Circuit.Location.locality}, {race.Circuit.Location.country}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-3 py-5">
                  <CalendarDays className="size-5 text-primary" />
                  <div className="leading-tight">
                    <p className="text-xs font-medium text-muted-foreground uppercase">Race day</p>
                    <p className="font-semibold">{formatDate(race.date)}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-3 py-5">
                  <Flag className="size-5 text-primary" />
                  <div className="leading-tight">
                    <p className="text-xs font-medium text-muted-foreground uppercase">Sprint</p>
                    <p className="font-semibold">{race.Sprint ? 'Yes' : 'No'}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {completed ? (
              <motion.section
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex flex-col gap-4"
              >
                {podium.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {podium.map((result, index) => (
                      <Card
                        key={`${result.Driver.driverId}-${result.position}`}
                        className={index === 0 ? 'border-primary/60' : ''}
                      >
                        <CardContent className="flex items-center gap-3 py-5">
                          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                            {result.position}
                          </span>
                          <div className="min-w-0 leading-tight">
                            <p className="truncate font-semibold">
                              {fullName(result.Driver.givenName, result.Driver.familyName)}
                            </p>
                            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <span
                                className="inline-block size-2 rounded-full"
                                style={{
                                  backgroundColor: teamColor(result.Constructor.constructorId),
                                }}
                              />
                              {result.Constructor.name}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : null}

                <Card>
                  <CardContent className="pt-6">
                    <RaceResultsTable results={raceResults} />
                  </CardContent>
                </Card>
              </motion.section>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <EmptyState
                    icon={CalendarDays}
                    title="This race hasn't happened yet"
                    description={`Results will appear here after ${race.raceName} is completed.`}
                  />
                </CardContent>
              </Card>
            )}
          </>
        ) : null}
      </QueryBoundary>
    </div>
  )
}
