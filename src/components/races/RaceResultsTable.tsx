import { motion } from 'framer-motion'

import { Badge } from '@/components/ui/badge'
import { teamColor } from '@/config/teams'
import { fullName } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { RaceResult } from '@/api/types'

interface RaceResultsTableProps {
  results: RaceResult[]
}

export function RaceResultsTable({ results }: RaceResultsTableProps) {
  const podium = new Set(['1', '2', '3'])

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b text-xs tracking-wider text-muted-foreground uppercase">
            <th className="px-2 py-3 text-left font-medium">Pos</th>
            <th className="px-2 py-3 text-left font-medium">Driver</th>
            <th className="hidden px-2 py-3 text-left font-medium sm:table-cell">Team</th>
            <th className="hidden px-2 py-3 text-right font-medium sm:table-cell">Grid</th>
            <th className="hidden px-2 py-3 text-right font-medium md:table-cell">Laps</th>
            <th className="px-2 py-3 text-right font-medium">Status</th>
            <th className="px-2 py-3 text-right font-medium">Points</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => {
            const driver = result.Driver
            const color = teamColor(result.Constructor.constructorId)
            return (
              <motion.tr
                key={`${driver.driverId}-${result.position}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.02 }}
                className="border-b last:border-0"
              >
                <td className="px-2 py-3">
                  <span
                    className={cn(
                      'inline-flex size-6 items-center justify-center rounded-full text-xs font-bold',
                      podium.has(result.position) && 'bg-primary text-primary-foreground',
                    )}
                  >
                    {result.position}
                  </span>
                </td>
                <td className="px-2 py-3">
                  <div className="flex items-center gap-3">
                    <span className="h-8 w-1 rounded-full" style={{ backgroundColor: color }} />
                    <div className="leading-tight">
                      <p className="font-semibold">
                        {fullName(driver.givenName, driver.familyName)}
                      </p>
                      <p className="text-xs text-muted-foreground uppercase">{driver.code}</p>
                    </div>
                  </div>
                </td>
                <td className="hidden px-2 py-3 sm:table-cell">
                  <Badge variant="secondary">{result.Constructor.name}</Badge>
                </td>
                <td className="hidden px-2 py-3 text-right text-muted-foreground tabular-nums sm:table-cell">
                  {result.grid}
                </td>
                <td className="hidden px-2 py-3 text-right text-muted-foreground tabular-nums md:table-cell">
                  {result.laps}
                </td>
                <td className="px-2 py-3 text-right">
                  <span
                    className={cn(
                      'text-xs font-medium',
                      result.status === 'Finished' ? 'text-emerald-500' : 'text-destructive',
                    )}
                  >
                    {result.status}
                  </span>
                </td>
                <td className="px-2 py-3 text-right font-bold tabular-nums">{result.points}</td>
              </motion.tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
