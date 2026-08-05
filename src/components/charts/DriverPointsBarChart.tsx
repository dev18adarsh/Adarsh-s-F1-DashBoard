import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { teamColor } from '@/config/teams'
import { fullName } from '@/lib/format'
import { useChartColors } from '@/hooks/use-chart-colors'
import type { DriverStanding } from '@/api/types'

interface DriverPointsBarChartProps {
  standings: DriverStanding[]
  limit?: number
}

interface ChartDatum {
  name: string
  shortName: string
  points: number
  constructorId: string
}

export function DriverPointsBarChart({ standings, limit = 10 }: DriverPointsBarChartProps) {
  const colors = useChartColors()

  const data: ChartDatum[] = standings
    .slice(0, limit)
    .map((standing) => ({
      name: fullName(standing.Driver.givenName, standing.Driver.familyName),
      shortName: `${standing.Driver.familyName}`,
      points: Number(standing.points),
      constructorId: standing.Constructors[0]?.constructorId ?? 'unknown',
    }))
    .sort((a, b) => b.points - a.points)

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 4, bottom: 4 }}>
        <XAxis type="number" stroke={colors.axis} tickLine={false} axisLine={false} fontSize={12} />
        <YAxis
          type="category"
          dataKey="shortName"
          stroke={colors.axis}
          tickLine={false}
          axisLine={false}
          width={90}
          fontSize={12}
        />
        <Tooltip
          cursor={{ fill: colors.grid, radius: 6 }}
          contentStyle={{
            backgroundColor: colors.tooltip.background,
            border: `1px solid ${colors.tooltip.border}`,
            borderRadius: 8,
            color: colors.tooltip.text,
            fontSize: 13,
          }}
          labelStyle={{ fontWeight: 600 }}
          formatter={(value) => [`${value} pts`, 'Points']}
        />
        <Bar dataKey="points" radius={[0, 6, 6, 0]} barSize={22}>
          {data.map((datum) => (
            <Cell key={datum.name} fill={teamColor(datum.constructorId)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
