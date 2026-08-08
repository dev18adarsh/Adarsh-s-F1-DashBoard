import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Flag, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

import { useRaceResults } from '@/hooks'
import { Badge, Button, Card, CardContent, EmptyState } from '@/components/ui'
import { PageHeader, QueryBoundary, TableSkeleton } from '@/components/shared'
import { RaceResultsTable } from '@/components/races'
import { formatDate, isRaceCompleted } from '@/utils'

export function RaceDetailPage() {
  const { sessionKey } = useParams<{ sessionKey: string }>()
  const key = Number(sessionKey)

  const results = useRaceResults(key, Number.isFinite(key) && key > 0)

  const race = results.data?.race
  const raceResults = results.data?.results ?? []
  const completed = race ? isRaceCompleted(race) : false
  const podium = raceResults.filter((result) => result.position != null && result.position <= 3)

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
              subtitle={
                race.round > 0 ? `Round ${race.round} · ${race.circuitName}` : race.circuitName
              }
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
                      {race.location}, {race.country}
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
                    <p className="font-semibold">{race.hasSprint ? 'Yes' : 'No'}</p>
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
                        key={`${result.driverNumber}-${result.position}`}
                        className={index === 0 ? 'border-primary/60' : ''}
                      >
                        <CardContent className="flex items-center gap-3 py-5">
                          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                            {result.position}
                          </span>
                          <div className="min-w-0 leading-tight">
                            <p className="truncate font-semibold">{result.fullName}</p>
                            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <span
                                className="inline-block size-2 rounded-full"
                                style={{ backgroundColor: result.teamColour }}
                              />
                              {result.teamName}
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
