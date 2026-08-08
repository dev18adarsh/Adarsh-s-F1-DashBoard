import { getOpenF1 } from './base'

import type { OpenF1Weather, WeatherFilters } from '@/types'

export async function fetchWeather(filters: WeatherFilters = {}): Promise<OpenF1Weather[]> {
  return getOpenF1<OpenF1Weather>('/weather', filters)
}
