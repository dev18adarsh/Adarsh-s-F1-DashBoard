import { motion } from 'framer-motion'

import { useConstructorStandings, useDriverStandings } from '@/hooks'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { PageHeader, QueryBoundary, TableSkeleton } from '@/components/shared'
import { ConstructorStandingsTable, DriverStandingsTable } from '@/components/standings'

export function StandingsPage() {
  const driverStandings = useDriverStandings()
  const constructorStandings = useConstructorStandings()

  const season = driverStandings.data?.season ?? constructorStandings.data?.season
  const round = driverStandings.data?.round ?? constructorStandings.data?.round

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Championship Standings"
        subtitle={
          season
            ? (round ?? 0) > 0
              ? `${season} season · up to date through round ${round}`
              : `${season} season`
            : `${new Date().getFullYear()} season`
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Tabs defaultValue="drivers">
          <TabsList>
            <TabsTrigger value="drivers">Drivers</TabsTrigger>
            <TabsTrigger value="constructors">Constructors</TabsTrigger>
          </TabsList>

          <TabsContent value="drivers" className="mt-4">
            <QueryBoundary
              isLoading={driverStandings.isLoading}
              isError={driverStandings.isError}
              error={driverStandings.error}
              retry={driverStandings.refetch}
              skeleton={<TableSkeleton rows={10} />}
            >
              <DriverStandingsTable standings={driverStandings.data?.standings ?? []} />
            </QueryBoundary>
          </TabsContent>

          <TabsContent value="constructors" className="mt-4">
            <QueryBoundary
              isLoading={constructorStandings.isLoading}
              isError={constructorStandings.isError}
              error={constructorStandings.error}
              retry={constructorStandings.refetch}
              skeleton={<TableSkeleton rows={10} />}
            >
              <ConstructorStandingsTable standings={constructorStandings.data?.standings ?? []} />
            </QueryBoundary>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
