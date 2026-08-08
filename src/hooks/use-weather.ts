import { useOpenF1Query, type UseOpenF1Options } from '@/hooks/use-openf1'
import type { OpenF1Weather, WeatherFilters } from '@/types'

export function useWeather(filters: WeatherFilters = {}, options?: UseOpenF1Options) {
  return useOpenF1Query<OpenF1Weather>('/weather', filters, options)
}
