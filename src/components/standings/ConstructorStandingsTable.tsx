import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { teamColor } from '@/config/teams'
import type { ConstructorStanding } from '@/api/types'

interface ConstructorStandingsTableProps {
  standings: ConstructorStanding[]
  limit?: number
}

export function ConstructorStandingsTable({ standings, limit }: ConstructorStandingsTableProps) {
  const rows = limit ? standings.slice(0, limit) : standings

  return (
    <Table className="min-w-[520px]">
      <TableHeader>
        <TableRow className="border-b hover:bg-transparent">
          <TableHead className="px-2">Pos</TableHead>
          <TableHead className="px-2">Constructor</TableHead>
          <TableHead className="hidden px-2 md:table-cell">Nationality</TableHead>
          <TableHead className="px-2 text-right">Wins</TableHead>
          <TableHead className="px-2 text-right">Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((standing, index) => {
          const constructor = standing.Constructor
          const color = teamColor(constructor.constructorId)
          return (
            <TableRow
              key={constructor.constructorId}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 35}ms` }}
            >
              <TableCell className="px-2">
                <span className="inline-flex size-6 items-center justify-center rounded-full text-xs font-bold">
                  {standing.position}
                </span>
              </TableCell>
              <TableCell className="px-2">
                <div className="flex items-center gap-3">
                  <span
                    className="h-8 w-1 rounded-full"
                    style={{ backgroundColor: color }}
                    aria-hidden="true"
                  />
                  <p className="font-semibold">{constructor.name}</p>
                </div>
              </TableCell>
              <TableCell className="hidden px-2 text-muted-foreground md:table-cell">
                {constructor.nationality}
              </TableCell>
              <TableCell className="px-2 text-right tabular-nums">{standing.wins}</TableCell>
              <TableCell className="px-2 text-right font-bold tabular-nums">
                {standing.points}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
