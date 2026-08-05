import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { teamColor } from '@/config/teams'
import { useChartColors } from '@/hooks/use-chart-colors'
import type { ConstructorStanding } from '@/api/types'

interface ConstructorShareDonutProps {
  standings: ConstructorStanding[]
}

export function ConstructorShareDonut({ standings }: ConstructorShareDonutProps) {
  const colors = useChartColors()

  const data = standings.map((standing) => ({
    name: standing.Constructor.name,
    value: Number(standing.points),
    constructorId: standing.Constructor.constructorId,
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
            <Cell key={entry.name} fill={teamColor(entry.constructorId)} />
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
