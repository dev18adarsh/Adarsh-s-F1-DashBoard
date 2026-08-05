import { useThemeStore } from '@/stores/theme-store'

export interface ChartColors {
  grid: string
  axis: string
  tooltip: {
    background: string
    border: string
    text: string
  }
}

export function useChartColors(): ChartColors {
  const theme = useThemeStore((state) => state.theme)

  if (theme === 'light') {
    return {
      grid: '#e4e4e7',
      axis: '#71717a',
      tooltip: { background: '#ffffff', border: '#e4e4e7', text: '#18181b' },
    }
  }

  return {
    grid: 'rgba(255,255,255,0.08)',
    axis: '#a1a1aa',
    tooltip: { background: '#18181b', border: 'rgba(255,255,255,0.1)', text: '#fafafa' },
  }
}
