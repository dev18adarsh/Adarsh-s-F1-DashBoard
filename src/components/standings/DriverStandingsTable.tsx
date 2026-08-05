import { motion } from 'framer-motion'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { teamColor } from '@/config/teams'
import { fullName, initials } from '@/lib/format'
import type { DriverStanding } from '@/api/types'

interface DriverStandingsTableProps {
  standings: DriverStanding[]
  limit?: number
}

export function DriverStandingsTable({ standings, limit }: DriverStandingsTableProps) {
  const rows = limit ? standings.slice(0, limit) : standings

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] text-sm">
        <thead>
          <tr className="border-b text-xs tracking-wider text-muted-foreground uppercase">
            <th className="px-2 py-3 text-left font-medium">Pos</th>
            <th className="px-2 py-3 text-left font-medium">Driver</th>
            <th className="hidden px-2 py-3 text-left font-medium md:table-cell">Nationality</th>
            <th className="hidden px-2 py-3 text-left font-medium sm:table-cell">Team</th>
            <th className="px-2 py-3 text-right font-medium">Wins</th>
            <th className="px-2 py-3 text-right font-medium">Points</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((standing, index) => {
            const driver = standing.Driver
            const constructor = standing.Constructors[0]
            const color = constructor ? teamColor(constructor.constructorId) : undefined
            return (
              <motion.tr
                key={driver.driverId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
                className="border-b last:border-0"
              >
                <td className="px-2 py-3">
                  <span className="inline-flex size-6 items-center justify-center rounded-full text-xs font-bold">
                    {standing.position}
                  </span>
                </td>
                <td className="px-2 py-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-8 w-1 rounded-full"
                      style={{ backgroundColor: color }}
                      aria-hidden="true"
                    />
                    <Avatar className="size-8 bg-muted">
                      <AvatarFallback className="text-[10px] font-bold">
                        {initials(driver.givenName, driver.familyName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="leading-tight">
                      <p className="font-semibold">
                        {fullName(driver.givenName, driver.familyName)}
                      </p>
                      <p className="text-xs text-muted-foreground uppercase">{driver.code}</p>
                    </div>
                  </div>
                </td>
                <td className="hidden px-2 py-3 text-muted-foreground md:table-cell">
                  {driver.nationality}
                </td>
                <td className="hidden px-2 py-3 sm:table-cell">
                  <Badge variant="secondary">{constructor?.name}</Badge>
                </td>
                <td className="px-2 py-3 text-right tabular-nums">{standing.wins}</td>
                <td className="px-2 py-3 text-right font-bold tabular-nums">{standing.points}</td>
              </motion.tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
