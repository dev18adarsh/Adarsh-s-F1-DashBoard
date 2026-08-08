import {
  Avatar,
  AvatarFallback,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import type { DriverStanding } from '@/types'
import { fullName, initials, teamColor } from '@/utils'

interface DriverStandingsTableProps {
  standings: DriverStanding[]
  limit?: number
}

export function DriverStandingsTable({ standings, limit }: DriverStandingsTableProps) {
  const rows = limit ? standings.slice(0, limit) : standings

  return (
    <Table className="min-w-[560px]">
      <TableHeader>
        <TableRow className="border-b hover:bg-transparent">
          <TableHead className="px-2">Pos</TableHead>
          <TableHead className="px-2">Driver</TableHead>
          <TableHead className="hidden px-2 md:table-cell">Nationality</TableHead>
          <TableHead className="hidden px-2 sm:table-cell">Team</TableHead>
          <TableHead className="px-2 text-right">Wins</TableHead>
          <TableHead className="px-2 text-right">Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((standing, index) => {
          const driver = standing.Driver
          const constructor = standing.Constructors[0]
          const color = constructor ? teamColor(constructor.constructorId) : undefined
          return (
            <TableRow
              key={driver.driverId}
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
                  <Avatar className="size-8 bg-muted">
                    <AvatarFallback className="text-[10px] font-bold">
                      {initials(driver.givenName, driver.familyName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="leading-tight">
                    <p className="font-semibold">{fullName(driver.givenName, driver.familyName)}</p>
                    <p className="text-xs text-muted-foreground uppercase">{driver.code}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden px-2 text-muted-foreground md:table-cell">
                {driver.nationality}
              </TableCell>
              <TableCell className="hidden px-2 sm:table-cell">
                <Badge variant="secondary">{constructor?.name}</Badge>
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
