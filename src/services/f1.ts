import {
  fetchChampionshipDrivers,
  fetchChampionshipTeams,
  fetchDrivers,
  fetchMeetings,
  fetchSessionResults,
  fetchSessions,
  fetchStartingGrid,
} from './openf1'

import type {
  ConstructorStanding,
  DriverStanding,
  OpenF1Session,
  OpenF1SessionResult,
  Race,
  RaceResult,
  RaceResultData,
  RaceResultStatus,
  StandingsResponse,
} from '@/types'

const CURRENT_YEAR = new Date().getFullYear()
const FALLBACK_COLOUR = '#94a3b8'

interface RaceCalendar {
  raceSessions: OpenF1Session[]
  sprintMeetingKeys: Set<number>
}

function byDateStart(
  a: { date_start: string },
  b: { date_start: string },
): number {
  return a.date_start.localeCompare(b.date_start)
}

function toColour(hex?: string): string {
  return hex ? `#${hex}` : FALLBACK_COLOUR
}

async function resolveRaceCalendar(year: number): Promise<RaceCalendar> {
  const [meetings, sessions] = await Promise.all([
    fetchMeetings({ year }),
    fetchSessions({ year }),
  ])

  const activeMeetingKeys = new Set(
    meetings.filter((meeting) => !meeting.is_cancelled).map((meeting) => meeting.meeting_key),
  )

  const raceSessions = sessions
    .filter(
      (session) =>
        session.session_name === 'Race' && activeMeetingKeys.has(session.meeting_key),
    )
    .sort(byDateStart)

  const sprintMeetingKeys = new Set(
    sessions
      .filter((session) => session.session_name === 'Sprint')
      .map((session) => session.meeting_key),
  )

  return { raceSessions, sprintMeetingKeys }
}

async function latestCompletedSessionKey(
  raceSessions: { session_key: number; date_end: string }[],
): Promise<number | undefined> {  const now = Date.now()
  const completed = raceSessions.filter(
    (session) => new Date(session.date_end).getTime() < now,
  )
  return completed[completed.length - 1]?.session_key
}

export async function fetchRaceSchedule(year = CURRENT_YEAR): Promise<Race[]> {
  const [meetings, calendar] = await Promise.all([
    fetchMeetings({ year }),
    resolveRaceCalendar(year),
  ])

  const meetingsById = new Map(meetings.map((meeting) => [meeting.meeting_key, meeting]))

  return calendar.raceSessions.map((session, index) => {
    const meeting = meetingsById.get(session.meeting_key)
    return {
      round: index + 1,
      meetingKey: session.meeting_key,
      sessionKey: session.session_key,
      raceName: meeting?.meeting_name ?? 'Grand Prix',
      officialName: meeting?.meeting_official_name ?? '',
      circuitName: session.circuit_short_name,
      location: session.location,
      country: session.country_name,
      countryCode: session.country_code,
      countryFlag: meeting?.country_flag ?? null,
      date: session.date_start,
      dateEnd: session.date_end,
      hasSprint: calendar.sprintMeetingKeys.has(session.meeting_key),
    }
  })
}

export async function fetchDriverStandings(
  year = CURRENT_YEAR,
): Promise<StandingsResponse<DriverStanding>> {
  const calendar = await resolveRaceCalendar(year)
  const latestKey = await latestCompletedSessionKey(calendar.raceSessions)
  if (!latestKey) return { season: year, round: 0, standings: [] }

  const [championship, drivers, sessionResults] = await Promise.all([
    fetchChampionshipDrivers({ session_key: latestKey }),
    fetchDrivers({ session_key: latestKey }),
    fetchSessionResults({
      session_key: calendar.raceSessions.map((session) => session.session_key),
    }),
  ])

  const driverById = new Map(drivers.map((driver) => [driver.driver_number, driver]))
  const winsByDriver = new Map<number, number>()
  for (const result of sessionResults) {
    if (result.position === 1) {
      winsByDriver.set(
        result.driver_number,
        (winsByDriver.get(result.driver_number) ?? 0) + 1,
      )
    }
  }

  const standings = championship
    .map((entry) => {
      const driver = driverById.get(entry.driver_number)
      return {
        position: entry.position_current,
        points: entry.points_current,
        wins: winsByDriver.get(entry.driver_number) ?? 0,
        driverNumber: entry.driver_number,
        fullName: driver?.full_name ?? `Driver ${entry.driver_number}`,
        firstName: driver?.first_name ?? '',
        lastName: driver?.last_name ?? '',
        acronym: driver?.name_acronym ?? '',
        headshotUrl: driver?.headshot_url ?? null,
        teamName: driver?.team_name ?? 'Unknown',
        teamColour: toColour(driver?.team_colour),
      }
    })
    .sort((a, b) => a.position - b.position)

  const round =
    calendar.raceSessions.findIndex((session) => session.session_key === latestKey) + 1

  return { season: year, round, standings }
}

export async function fetchConstructorStandings(
  year = CURRENT_YEAR,
): Promise<StandingsResponse<ConstructorStanding>> {
  const calendar = await resolveRaceCalendar(year)
  const latestKey = await latestCompletedSessionKey(calendar.raceSessions)
  if (!latestKey) return { season: year, round: 0, standings: [] }

  const [championship, drivers, sessionResults] = await Promise.all([
    fetchChampionshipTeams({ session_key: latestKey }),
    fetchDrivers({ session_key: latestKey }),
    fetchSessionResults({
      session_key: calendar.raceSessions.map((session) => session.session_key),
    }),
  ])

  const driverById = new Map(drivers.map((driver) => [driver.driver_number, driver]))
  const colourByTeam = new Map<string, string>()
  for (const driver of drivers) {
    if (!colourByTeam.has(driver.team_name)) {
      colourByTeam.set(driver.team_name, toColour(driver.team_colour))
    }
  }

  const winsByTeam = new Map<string, number>()
  for (const result of sessionResults) {
    if (result.position === 1) {
      const teamName = driverById.get(result.driver_number)?.team_name ?? 'Unknown'
      winsByTeam.set(teamName, (winsByTeam.get(teamName) ?? 0) + 1)
    }
  }

  const standings = championship
    .map((entry) => ({
      position: entry.position_current,
      points: entry.points_current,
      wins: winsByTeam.get(entry.team_name) ?? 0,
      teamName: entry.team_name,
      teamColour: colourByTeam.get(entry.team_name) ?? FALLBACK_COLOUR,
    }))
    .sort((a, b) => a.position - b.position)

  const round =
    calendar.raceSessions.findIndex((session) => session.session_key === latestKey) + 1

  return { season: year, round, standings }
}

export async function fetchRaceResults(sessionKey: number): Promise<RaceResultData> {
  const session = (await fetchSessions({ session_key: sessionKey }))[0]
  if (!session) throw new Error('Race session not found')

  const [meetings, calendar] = await Promise.all([
    fetchMeetings({ meeting_key: session.meeting_key }),
    resolveRaceCalendar(session.year),
  ])

  const meeting = meetings[0]
  const round =
    calendar.raceSessions.findIndex(
      (raceSession) => raceSession.session_key === sessionKey,
    ) + 1

  const [results, drivers, grid] = await Promise.all([
    fetchSessionResults({ session_key: sessionKey }).catch(
      (): OpenF1SessionResult[] => [],
    ),
    fetchDrivers({ session_key: sessionKey }).catch(() => []),
    fetchStartingGrid({ session_key: sessionKey }).catch(() => []),
  ])

  const driverById = new Map(drivers.map((driver) => [driver.driver_number, driver]))
  const gridByDriver = new Map(grid.map((entry) => [entry.driver_number, entry.position]))

  const race: Race = {
    round: round > 0 ? round : 0,
    meetingKey: session.meeting_key,
    sessionKey: session.session_key,
    raceName: meeting?.meeting_name ?? `${session.location} Grand Prix`,
    officialName: meeting?.meeting_official_name ?? '',
    circuitName: session.circuit_short_name,
    location: session.location,
    country: session.country_name,
    countryCode: session.country_code,
    countryFlag: meeting?.country_flag ?? null,
    date: session.date_start,
    dateEnd: session.date_end,
    hasSprint: calendar.sprintMeetingKeys.has(session.meeting_key),
  }

  const raceResults: RaceResult[] = results
    .map((result) => {
      const driver = driverById.get(result.driver_number)
      const status: RaceResultStatus = result.dsq
        ? 'DSQ'
        : result.dns
          ? 'DNS'
          : result.dnf
            ? 'DNF'
            : 'Finished'
      return {
        position: result.position,
        driverNumber: result.driver_number,
        fullName: driver?.full_name ?? `Driver ${result.driver_number}`,
        firstName: driver?.first_name ?? '',
        lastName: driver?.last_name ?? '',
        acronym: driver?.name_acronym ?? '',
        headshotUrl: driver?.headshot_url ?? null,
        teamName: driver?.team_name ?? 'Unknown',
        teamColour: toColour(driver?.team_colour),
        grid: gridByDriver.get(result.driver_number),
        laps: result.number_of_laps,
        points: result.points,
        status,
        gapToLeader: result.gap_to_leader,
      }
    })
    .sort(
      (a, b) =>
        (a.position ?? Number.MAX_SAFE_INTEGER) - (b.position ?? Number.MAX_SAFE_INTEGER),
    )

  return { race, results: raceResults }
}
