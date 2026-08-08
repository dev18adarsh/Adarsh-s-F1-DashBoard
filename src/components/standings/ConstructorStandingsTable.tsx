import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import type { ConstructorStanding } from '@/types'

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
          <TableHead className="px-2 text-right">Wins</TableHead>
          <TableHead className="px-2 text-right">Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((standing, index) => (
          <TableRow
            key={standing.teamName}
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
                  style={{ backgroundColor: standing.teamColour }}
                  aria-hidden="true"
                />
                <p className="font-semibold">{standing.teamName}</p>
              </div>
            </TableCell>
            <TableCell className="px-2 text-right tabular-nums">{standing.wins}</TableCell>
            <TableCell className="px-2 text-right font-bold tabular-nums">
              {standing.points}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
