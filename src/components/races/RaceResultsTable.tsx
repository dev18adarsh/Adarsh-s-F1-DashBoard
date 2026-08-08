import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import type { RaceResult } from '@/types'
import { cn, fullName, teamColor } from '@/utils'

interface RaceResultsTableProps {
  results: RaceResult[]
}

export function RaceResultsTable({ results }: RaceResultsTableProps) {
  const podium = new Set(['1', '2', '3'])

  return (
    <Table className="min-w-[640px]">
      <TableHeader>
        <TableRow className="border-b hover:bg-transparent">
          <TableHead className="px-2">Pos</TableHead>
          <TableHead className="px-2">Driver</TableHead>
          <TableHead className="hidden px-2 sm:table-cell">Team</TableHead>
          <TableHead className="hidden px-2 text-right sm:table-cell">Grid</TableHead>
          <TableHead className="hidden px-2 text-right md:table-cell">Laps</TableHead>
          <TableHead className="px-2 text-right">Status</TableHead>
          <TableHead className="px-2 text-right">Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.map((result, index) => {
          const driver = result.Driver
          const color = teamColor(result.Constructor.constructorId)
          return (
            <TableRow
              key={`${driver.driverId}-${result.position}`}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 35}ms` }}
            >
              <TableCell className="px-2">
                <span
                  className={cn(
                    'inline-flex size-6 items-center justify-center rounded-full text-xs font-bold',
                    podium.has(result.position) && 'bg-primary text-primary-foreground shadow-glow',
                  )}
                >
                  {result.position}
                </span>
              </TableCell>
              <TableCell className="px-2">
                <div className="flex items-center gap-3">
                  <span className="h-8 w-1 rounded-full" style={{ backgroundColor: color }} />
                  <div className="leading-tight">
                    <p className="font-semibold">{fullName(driver.givenName, driver.familyName)}</p>
                    <p className="text-xs text-muted-foreground uppercase">{driver.code}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden px-2 sm:table-cell">
                <Badge variant="secondary">{result.Constructor.name}</Badge>
              </TableCell>
              <TableCell className="hidden px-2 text-right text-muted-foreground tabular-nums sm:table-cell">
                {result.grid}
              </TableCell>
              <TableCell className="hidden px-2 text-right text-muted-foreground tabular-nums md:table-cell">
                {result.laps}
              </TableCell>
              <TableCell className="px-2 text-right">
                <span
                  className={cn(
                    'text-xs font-medium',
                    result.status === 'Finished' ? 'text-emerald-500' : 'text-destructive',
                  )}
                >
                  {result.status}
                </span>
              </TableCell>
              <TableCell className="px-2 text-right font-bold tabular-nums">
                {result.points}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
