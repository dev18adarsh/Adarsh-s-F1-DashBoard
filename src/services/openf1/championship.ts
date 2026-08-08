import { getOpenF1 } from './base'

import type {
  ChampionshipDriverFilters,
  ChampionshipTeamFilters,
  OpenF1ChampionshipDriver,
  OpenF1ChampionshipTeam,
} from '@/types'

export async function fetchChampionshipDrivers(
  filters: ChampionshipDriverFilters = {},
): Promise<OpenF1ChampionshipDriver[]> {
  return getOpenF1<OpenF1ChampionshipDriver>('/championship_drivers', filters)
}

export async function fetchChampionshipTeams(
  filters: ChampionshipTeamFilters = {},
): Promise<OpenF1ChampionshipTeam[]> {
  return getOpenF1<OpenF1ChampionshipTeam>('/championship_teams', filters)
}
