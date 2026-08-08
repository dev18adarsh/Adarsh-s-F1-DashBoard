import {
  Badge,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import type { RaceResult } from '@/types'
import { cn } from '@/utils'

interface RaceResultsTableProps {
  results: RaceResult[]
}

export function RaceResultsTable({ results }: RaceResultsTableProps) {
  const podium = new Set([1, 2, 3])

  return (
    <>
      <ol className="divide-y divide-border/60 sm:hidden">
        {results.map((result, index) => (
          <li
            key={`${result.driverNumber}-${result.position}`}
            className="flex animate-fade-in items-center gap-3 py-3"
            style={{ animationDelay: `${index * 35}ms` }}
          >
            <span
              className={cn(
                'inline-flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold tabular-nums',
                result.position != null &&
                  podium.has(result.position) &&
                  'bg-primary text-primary-foreground shadow-glow',
              )}
            >
              {result.position ?? '–'}
            </span>
            <span
              className="h-8 w-1 shrink-0 rounded-full"
              style={{ backgroundColor: result.teamColour }}
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate font-semibold">{result.fullName}</p>
              <p className="truncate text-xs text-muted-foreground">
                <span
                  className={cn(
                    'font-medium',
                    result.status === 'Finished' ? 'text-teal-strong' : 'text-destructive',
                  )}
                >
                  {result.status}
                </span>
                <span className="text-muted-foreground/70"> · {result.teamName}</span>
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="font-bold tabular-nums">{result.points}</p>
              <p className="text-xs text-muted-foreground tabular-nums">{result.laps} laps</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="hidden sm:block">
        <Table className="min-w-[640px]">
          <TableCaption className="sr-only">Race results</TableCaption>
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
            {results.map((result, index) => (
              <TableRow
                key={`${result.driverNumber}-${result.position}`}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 35}ms` }}
              >
                <TableCell className="px-2">
                  <span
                    className={cn(
                      'inline-flex size-6 items-center justify-center rounded-full text-xs font-bold',
                      result.position != null &&
                        podium.has(result.position) &&
                        'bg-primary text-primary-foreground shadow-glow',
                    )}
                  >
                    {result.position ?? '–'}
                  </span>
                </TableCell>
                <TableCell className="px-2">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-8 w-1 rounded-full"
                      style={{ backgroundColor: result.teamColour }}
                    />
                    <div className="leading-tight">
                      <p className="font-semibold">{result.fullName}</p>
                      <p className="text-xs text-muted-foreground uppercase">{result.acronym}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden px-2 sm:table-cell">
                  <Badge variant="secondary">{result.teamName}</Badge>
                </TableCell>
                <TableCell className="hidden px-2 text-right text-muted-foreground tabular-nums sm:table-cell">
                  {result.grid ?? '–'}
                </TableCell>
                <TableCell className="hidden px-2 text-right text-muted-foreground tabular-nums md:table-cell">
                  {result.laps}
                </TableCell>
                <TableCell className="px-2 text-right">
                  <span
                    className={cn(
                      'text-xs font-medium',
                      result.status === 'Finished' ? 'text-teal-strong' : 'text-destructive',
                    )}
                  >
                    {result.status}
                  </span>
                </TableCell>
                <TableCell className="px-2 text-right font-bold tabular-nums">
                  {result.points}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
