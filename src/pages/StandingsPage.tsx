import { motion } from 'framer-motion'

import { useConstructorStandings, useDriverStandings } from '@/api/hooks'
import { PageHeader } from '@/components/shared/PageHeader'
import { QueryBoundary } from '@/components/shared/QueryBoundary'
import { TableSkeleton } from '@/components/shared/skeletons'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DriverStandingsTable } from '@/components/standings/DriverStandingsTable'
import { ConstructorStandingsTable } from '@/components/standings/ConstructorStandingsTable'

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
            ? `${season} season · up to date through round ${round}`
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
