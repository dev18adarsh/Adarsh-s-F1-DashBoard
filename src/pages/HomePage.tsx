import { Link } from 'react-router-dom'
import { CalendarDays, ChevronRight, Crown, Flag, Gauge, Trophy } from 'lucide-react'
import { motion } from 'framer-motion'

import {
  useConstructorStandings,
  useDriverStandings,
  useRaceResults,
  useRaceSchedule,
} from '@/api/hooks'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { QueryBoundary } from '@/components/shared/QueryBoundary'
import { StatCard } from '@/components/shared/StatCard'
import {
  ChartSkeleton,
  RaceCardSkeleton,
  StatCardSkeleton,
  TableSkeleton,
} from '@/components/shared/skeletons'
import { DriverPointsBarChart } from '@/components/charts/DriverPointsBarChart'
import { ConstructorShareDonut } from '@/components/charts/ConstructorShareDonut'
import { DriverStandingsTable } from '@/components/standings/DriverStandingsTable'
import { RaceCard } from '@/components/races/RaceCard'
import { RaceResultsTable } from '@/components/races/RaceResultsTable'
import { SITE } from '@/config/site'
import { teamColor } from '@/config/teams'
import { fullName } from '@/lib/format'
import { isRaceCompleted } from '@/lib/races'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export function HomePage() {
  const schedule = useRaceSchedule()
  const driverStandings = useDriverStandings()
  const constructorStandings = useConstructorStandings()

  const races = schedule.data ?? []
  const completedRaces = races.filter(isRaceCompleted)
  const upcomingRaces = races.filter((race) => !isRaceCompleted(race))
  const lastRace = completedRaces[completedRaces.length - 1]
  const lastRound = lastRace?.round

  const lastRaceResults = useRaceResults(lastRound ?? '', Boolean(lastRound))

  const driverList = driverStandings.data?.standings ?? []
  const constructorList = constructorStandings.data?.standings ?? []

  const leader = driverList[0]
  const constructorLeader = constructorList[0]

  const seasonRound = driverStandings.data?.round
  const seasonYear = driverStandings.data?.season

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4 pt-6 pb-2 text-center sm:pt-10"
        >
          <Badge variant="outline" className="gap-2 rounded-full px-3 py-1">
            <Gauge className="size-3.5 text-primary" />
            {seasonYear ? `${seasonYear} Season Live` : 'Live Data'}
          </Badge>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">{SITE.name}</h1>
          <p className="max-w-xl text-base text-muted-foreground sm:text-lg">{SITE.tagline}</p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Button asChild>
              <Link to="/standings">
                <Trophy className="size-4" />
                View Standings
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/races">
                <CalendarDays className="size-4" />
                Race Schedule
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <motion.div variants={item}>
            <QueryBoundary
              isLoading={driverStandings.isLoading}
              isError={driverStandings.isError}
              error={driverStandings.error}
              retry={driverStandings.refetch}
              skeleton={<StatCardSkeleton />}
            >
              {leader ? (
                <StatCard
                  label="Championship Leader"
                  value={fullName(leader.Driver.givenName, leader.Driver.familyName)}
                  hint={`${leader.Constructors[0]?.name} · ${leader.wins} wins`}
                  icon={Crown}
                />
              ) : null}
            </QueryBoundary>
          </motion.div>

          <motion.div variants={item}>
            <QueryBoundary
              isLoading={driverStandings.isLoading}
              isError={driverStandings.isError}
              error={driverStandings.error}
              retry={driverStandings.refetch}
              skeleton={<StatCardSkeleton />}
            >
              {leader ? (
                <StatCard
                  label="Leader Points"
                  value={`${leader.points} pts`}
                  hint={`${seasonYear ?? ''} Drivers' Championship`}
                  icon={Trophy}
                />
              ) : null}
            </QueryBoundary>
          </motion.div>

          <motion.div variants={item}>
            <QueryBoundary
              isLoading={constructorStandings.isLoading}
              isError={constructorStandings.isError}
              error={constructorStandings.error}
              retry={constructorStandings.refetch}
              skeleton={<StatCardSkeleton />}
            >
              {constructorLeader ? (
                <StatCard
                  label="Constructors Leader"
                  value={constructorLeader.Constructor.name}
                  hint={`${constructorLeader.wins} wins`}
                  icon={Flag}
                />
              ) : null}
            </QueryBoundary>
          </motion.div>

          <motion.div variants={item}>
            <QueryBoundary
              isLoading={schedule.isLoading}
              isError={schedule.isError}
              error={schedule.error}
              retry={schedule.refetch}
              skeleton={<StatCardSkeleton />}
            >
              <StatCard
                label="Race Progress"
                value={`${completedRaces.length} / ${races.length}`}
                hint={seasonRound ? `Through round ${seasonRound}` : '2026 season'}
                icon={Flag}
              />
            </QueryBoundary>
          </motion.div>
        </motion.div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-3"
        >
          <QueryBoundary
            isLoading={driverStandings.isLoading}
            isError={driverStandings.isError}
            error={driverStandings.error}
            retry={driverStandings.refetch}
            skeleton={<ChartSkeleton />}
          >
            {driverList.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Championship Points</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Top {Math.min(10, driverList.length)} drivers by points
                  </p>
                </CardHeader>
                <CardContent>
                  <DriverPointsBarChart standings={driverList} />
                </CardContent>
              </Card>
            ) : null}
          </QueryBoundary>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <QueryBoundary
            isLoading={constructorStandings.isLoading}
            isError={constructorStandings.isError}
            error={constructorStandings.error}
            retry={constructorStandings.refetch}
            skeleton={<ChartSkeleton height={320} />}
          >
            {constructorList.length > 0 ? (
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Constructors' Points Share</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Distribution of total constructor points
                  </p>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                  <ConstructorShareDonut standings={constructorList} />
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5">
                    {constructorList.map((standing) => (
                      <span
                        key={standing.Constructor.constructorId}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground"
                      >
                        <span
                          className="size-2.5 rounded-full"
                          style={{ backgroundColor: teamColor(standing.Constructor.constructorId) }}
                        />
                        {standing.Constructor.name}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </QueryBoundary>
        </motion.div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-3"
        >
          <QueryBoundary
            isLoading={lastRaceResults.isLoading}
            isError={lastRaceResults.isError}
            error={lastRaceResults.error}
            retry={lastRaceResults.refetch}
            skeleton={<TableSkeleton rows={6} />}
          >
            {lastRaceResults.data ? (
              <Card>
                <CardHeader className="flex-row items-center justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle>Latest Race Results</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Round {lastRaceResults.data.race.round} · {lastRaceResults.data.race.raceName}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/races/${lastRaceResults.data.race.round}`}>
                      Details
                      <ChevronRight className="size-4" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <RaceResultsTable results={lastRaceResults.data.results.slice(0, 10)} />
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center gap-2 py-10 text-center">
                  <Flag className="size-8 text-muted-foreground" />
                  <p className="font-semibold">No race results yet</p>
                  <p className="text-sm text-muted-foreground">
                    The first race of the season hasn't been run yet.
                  </p>
                </CardContent>
              </Card>
            )}
          </QueryBoundary>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="flex h-full flex-col gap-4">
            <QueryBoundary
              isLoading={driverStandings.isLoading}
              isError={driverStandings.isError}
              error={driverStandings.error}
              retry={driverStandings.refetch}
              skeleton={<TableSkeleton rows={5} />}
            >
              <Card className="flex-1">
                <CardHeader className="flex-row items-center justify-between gap-4">
                  <CardTitle>Top 5 Drivers</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/standings">
                      All standings
                      <ChevronRight className="size-4" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <DriverStandingsTable standings={driverList} limit={5} />
                </CardContent>
              </Card>
            </QueryBoundary>
          </div>
        </motion.div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight">Upcoming Races</h2>
            <p className="text-sm text-muted-foreground">
              Next {Math.min(3, upcomingRaces.length)} events on the {seasonYear ?? ''} calendar
            </p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/races">
              Full calendar
              <ChevronRight className="size-4" />
            </Link>
          </Button>
        </div>
        <QueryBoundary
          isLoading={schedule.isLoading}
          isError={schedule.isError}
          error={schedule.error}
          retry={schedule.refetch}
          skeleton={
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <RaceCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          {upcomingRaces.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingRaces.slice(0, 3).map((race, index) => (
                <RaceCard key={race.round} race={race} index={index} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center gap-2 py-10 text-center">
                <CalendarDays className="size-8 text-muted-foreground" />
                <p className="font-semibold">Season complete</p>
                <p className="text-sm text-muted-foreground">Check back next season!</p>
              </CardContent>
            </Card>
          )}
        </QueryBoundary>
      </section>
    </div>
  )
}
