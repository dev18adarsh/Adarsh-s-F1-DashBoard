import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { useChartColors } from '@/hooks'
import type { ConstructorStanding } from '@/types'

interface ConstructorShareDonutProps {
  standings: ConstructorStanding[]
}

export function ConstructorShareDonut({ standings }: ConstructorShareDonutProps) {
  const colors = useChartColors()

  const data = standings.map((standing) => ({
    name: standing.teamName,
    value: standing.points,
    colour: standing.teamColour,
  }))

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
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.colour} />
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
