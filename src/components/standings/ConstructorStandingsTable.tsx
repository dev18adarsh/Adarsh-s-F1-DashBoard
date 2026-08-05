import { motion } from 'framer-motion'

import { teamColor } from '@/config/teams'
import type { ConstructorStanding } from '@/api/types'

interface ConstructorStandingsTableProps {
  standings: ConstructorStanding[]
  limit?: number
}

export function ConstructorStandingsTable({ standings, limit }: ConstructorStandingsTableProps) {
  const rows = limit ? standings.slice(0, limit) : standings

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] text-sm">
        <thead>
          <tr className="border-b text-xs tracking-wider text-muted-foreground uppercase">
            <th className="px-2 py-3 text-left font-medium">Pos</th>
            <th className="px-2 py-3 text-left font-medium">Constructor</th>
            <th className="hidden px-2 py-3 text-left font-medium md:table-cell">Nationality</th>
            <th className="px-2 py-3 text-right font-medium">Wins</th>
            <th className="px-2 py-3 text-right font-medium">Points</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((standing, index) => {
            const constructor = standing.Constructor
            const color = teamColor(constructor.constructorId)
            return (
              <motion.tr
                key={constructor.constructorId}
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
                    <span className="h-8 w-1 rounded-full" style={{ backgroundColor: color }} />
                    <p className="font-semibold">{constructor.name}</p>
                  </div>
                </td>
                <td className="hidden px-2 py-3 text-muted-foreground md:table-cell">
                  {constructor.nationality}
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
