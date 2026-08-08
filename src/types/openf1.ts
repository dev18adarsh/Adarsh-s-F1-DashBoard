export type OpenF1ParamValue = string | number | boolean | Array<string | number | boolean>

export interface OpenF1Query {
  [key: string]: OpenF1ParamValue | undefined
}

export interface DriverFilters extends OpenF1Query {
  driver_number?: number | number[]
  meeting_key?: number | string
  session_key?: number | string
  team_name?: string
  name_acronym?: string
  country_code?: string
}

export interface MeetingFilters extends OpenF1Query {
  year?: number
  meeting_key?: number | string
  circuit_key?: number
  country_name?: string
  country_code?: string
  location?: string
  meeting_name?: string
}

export interface SessionFilters extends OpenF1Query {
  meeting_key?: number | string
  session_key?: number | string
  year?: number
  circuit_key?: number
  country_name?: string
  country_code?: string
  location?: string
  session_name?: string
  session_type?: string
}

export interface WeatherFilters extends OpenF1Query {
  meeting_key?: number | string
  session_key?: number | string
  date?: string
  air_temperature?: number
  humidity?: number
  pressure?: number
  rainfall?: number
  track_temperature?: number
  wind_direction?: number
  wind_speed?: number
}

export interface PitStopFilters extends OpenF1Query {
  meeting_key?: number | string
  session_key?: number | string
  driver_number?: number | number[]
  lap_number?: number
  stop_duration?: number
  date?: string
}

export interface LapFilters extends OpenF1Query {
  meeting_key?: number | string
  session_key?: number | string
  driver_number?: number | number[]
  lap_number?: number
  date_start?: string
}

export interface PositionFilters extends OpenF1Query {
  meeting_key?: number | string
  session_key?: number | string
  driver_number?: number | number[]
  position?: number
  date?: string
}

export interface RaceControlFilters extends OpenF1Query {
  meeting_key?: number | string
  session_key?: number | string
  driver_number?: number | number[]
  category?: string
  flag?: string
  scope?: string
  sector?: number
  lap_number?: number
  date?: string
}

export interface CarDataFilters extends OpenF1Query {
  meeting_key?: number | string
  session_key?: number | string
  driver_number?: number | number[]
  speed?: number
  rpm?: number
  n_gear?: number
  throttle?: number
  brake?: number
  drs?: number
  date?: string
}

export interface IntervalFilters extends OpenF1Query {
  meeting_key?: number | string
  session_key?: number | string
  driver_number?: number | number[]
  gap_to_leader?: number
  interval?: number
  date?: string
}

export interface RadioFilters extends OpenF1Query {
  meeting_key?: number | string
  session_key?: number | string
  driver_number?: number | number[]
  date?: string
}

export interface ChampionshipDriverFilters extends OpenF1Query {
  meeting_key?: number | string
  session_key?: number | string | Array<number | string>
  driver_number?: number | number[]
}

export interface ChampionshipTeamFilters extends OpenF1Query {
  meeting_key?: number | string
  session_key?: number | string | Array<number | string>
  team_name?: string
}

export interface SessionResultFilters extends OpenF1Query {
  meeting_key?: number | string
  session_key?: number | string | Array<number | string>
  driver_number?: number | number[]
  position?: number
}

export interface StartingGridFilters extends OpenF1Query {
  meeting_key?: number | string
  session_key?: number | string
  driver_number?: number | number[]
  position?: number
}

export interface StintFilters extends OpenF1Query {
  meeting_key?: number | string
  session_key?: number | string
  driver_number?: number | number[]
  stint_number?: number
  compound?: string
}

export interface OpenF1Driver {
  broadcast_name: string
  country_code?: string
  driver_number: number
  first_name: string
  full_name: string
  headshot_url?: string | null
  last_name: string
  meeting_key: number
  name_acronym: string
  session_key: number
  team_colour: string
  team_name: string
}

export interface OpenF1Meeting {
  circuit_key: number
  circuit_info_url?: string | null
  circuit_image?: string | null
  circuit_short_name: string
  circuit_type?: string | null
  country_code?: string | null
  country_flag?: string | null
  country_key: number
  country_name: string
  date_end: string
  date_start: string
  gmt_offset: string
  is_cancelled: boolean
  location: string
  meeting_key: number
  meeting_name: string
  meeting_official_name: string
  year: number
}

export interface OpenF1Session {
  circuit_key: number
  circuit_short_name: string
  country_code: string
  country_key: number
  country_name: string
  date_end: string
  date_start: string
  gmt_offset: string
  is_cancelled: boolean
  location: string
  meeting_key: number
  session_key: number
  session_name: string
  session_type: string
  year: number
}

export interface OpenF1Weather {
  air_temperature: number
  date: string
  humidity: number
  meeting_key: number
  pressure: number
  rainfall: number
  session_key: number
  track_temperature: number
  wind_direction: number
  wind_speed: number
}

export interface OpenF1PitStop {
  date: string
  driver_number: number
  lane_duration: number
  lap_number: number
  meeting_key: number
  pit_duration?: number
  session_key: number
  stop_duration?: number | null
}

export interface OpenF1Lap {
  date_start: string
  driver_number: number
  duration_sector_1?: number | null
  duration_sector_2?: number | null
  duration_sector_3?: number | null
  i1_speed?: number | null
  i2_speed?: number | null
  i3_speed?: number | null
  is_pit_out_lap: boolean
  lap_duration?: number | null
  lap_number: number
  meeting_key: number
  segments_sector_1?: number[] | null
  segments_sector_2?: number[] | null
  segments_sector_3?: number[] | null
  session_key: number
  st_speed?: number | null
}

export interface OpenF1Position {
  date: string
  driver_number: number
  meeting_key: number
  position: number
  session_key: number
}

export interface OpenF1RaceControl {
  category: string
  date: string
  driver_number?: number | null
  flag?: string | null
  lap_number?: number | null
  meeting_key: number
  message: string
  qualifying_phase?: number | string | null
  scope?: string | null
  sector?: number | null
  session_key: number
}

export interface OpenF1Interval {
  date: string
  driver_number: number
  gap_to_leader: number | string | null
  interval: number | string | null
  meeting_key: number
  session_key: number
}

export interface OpenF1RadioMessage {
  date: string
  driver_number: number
  meeting_key: number
  recording_url: string
  session_key: number
}

export interface OpenF1CarData {
  brake: number
  date: string
  driver_number: number
  drs: number
  meeting_key: number
  n_gear: number
  rpm: number
  session_key: number
  speed: number
  throttle: number
}

export interface OpenF1ChampionshipDriver {
  driver_number: number
  meeting_key: number
  points_current: number
  points_start: number
  position_current: number
  position_start: number
  session_key: number
}

export interface OpenF1ChampionshipTeam {
  meeting_key: number
  points_current: number
  points_start: number
  position_current: number
  position_start: number
  session_key: number
  team_name: string
}

export interface OpenF1SessionResult {
  dnf: boolean
  dns: boolean
  dsq: boolean
  driver_number: number
  duration: number
  gap_to_leader: number | string | null
  number_of_laps: number
  meeting_key: number
  points: number
  position: number | null
  session_key: number
}

export interface OpenF1StartingGrid {
  driver_number: number
  lap_duration: number
  meeting_key: number
  position: number
  session_key: number
}

export interface OpenF1Stint {
  compound: string
  driver_number: number
  lap_end: number
  lap_start: number
  meeting_key: number
  session_key: number
  stint_number: number
  tyre_age_at_start: number
}
