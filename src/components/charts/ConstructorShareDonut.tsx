import { memo } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { useReducedMotion } from 'framer-motion'

import { useChartColors } from '@/hooks'
import type { ConstructorStanding } from '@/types'

interface ConstructorShareDonutProps {
  standings: ConstructorStanding[]
}

interface ChartDatum {
  name: string
  value: number
  colour: string
}

function ConstructorShareDonutBase({ standings }: ConstructorShareDonutProps) {
  const colors = useChartColors()
  const reduceMotion = useReducedMotion()

  const data: ChartDatum[] = standings.map((standing) => ({
    name: standing.teamName,
    value: standing.points,
    colour: standing.teamColour,
  }))

  const leaderName = data[0]?.name

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={100}
          paddingAngle={2}
          stroke="none"
          isAnimationActive={!reduceMotion}
        >
          {data.map((entry) => (
            <Cell
              key={entry.name}
              fill={entry.colour}
              stroke={entry.name === leaderName ? colors.accent : 'none'}
              strokeWidth={entry.name === leaderName ? 2 : 0}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: colors.tooltip.background,
            border: `1px solid ${colors.tooltip.border}`,
            borderRadius: 8,
            color: colors.tooltip.text,
            fontSize: 13,
          }}
          formatter={(value, name) => [`${value} pts`, String(name)]}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export const ConstructorShareDonut = memo(ConstructorShareDonutBase)
