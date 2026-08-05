export const TEAM_COLORS: Record<string, string> = {
  red_bull: '#3671C6',
  mercedes: '#27F4D2',
  ferrari: '#E8002D',
  mclaren: '#FF8000',
  aston_martin: '#229971',
  alpine: '#0093CC',
  williams: '#64C4FF',
  rb: '#6692FF',
  racing_bulls: '#6692FF',
  haas: '#B6BABD',
  sauber: '#52E252',
  kick_sauber: '#52E252',
}

export const FALLBACK_TEAM_COLOR = '#94a3b8'

export function teamColor(constructorId: string): string {
  return TEAM_COLORS[constructorId] ?? FALLBACK_TEAM_COLOR
}
