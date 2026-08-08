import { memo } from 'react'
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useReducedMotion } from 'framer-motion'

import { useChartColors } from '@/hooks'
import type { DriverStanding } from '@/types'

interface DriverPointsBarChartProps {
  standings: DriverStanding[]
  limit?: number
}

interface ChartDatum {
  name: string
  shortName: string
  points: number
  colour: string
}

function DriverPointsBarChartBase({ standings, limit = 10 }: DriverPointsBarChartProps) {
  const colors = useChartColors()
  const reduceMotion = useReducedMotion()

  const data: ChartDatum[] = standings
    .slice(0, limit)
    .map((standing) => ({
      name: standing.fullName,
      shortName: standing.lastName,
      points: standing.points,
      colour: standing.teamColour,
    }))
    .sort((a, b) => b.points - a.points)

  const leaderName = data[0]?.name

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
        <Bar dataKey="points" radius={[0, 6, 6, 0]} barSize={22} isAnimationActive={!reduceMotion}>
          {data.map((datum) => (
            <Cell
              key={datum.name}
              fill={datum.colour}
              stroke={datum.name === leaderName ? colors.accent : 'none'}
              strokeWidth={datum.name === leaderName ? 2 : 0}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export const DriverPointsBarChart = memo(DriverPointsBarChartBase)
