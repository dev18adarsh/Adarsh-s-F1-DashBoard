# Adarsh's F1 Dashboard

Real-time Formula One Analytics, Statistics & Insights.

## Description

A modern React dashboard for the current Formula One season — live championship
standings, the race calendar and per-race results. Built with a strict, scalable,
typed architecture. All data comes from the open [OpenF1 API](https://openf1.org/);
no mock data and no API keys required.

## Features

- **Dashboard** — championship leader stats, drivers' points bar chart,
  constructors' points share donut, latest race results, upcoming races
- **Standings** — full Drivers' and Constructors' championship tables (tabs)
- **Races** — the full season calendar split into Upcoming / Completed
- **Race details** — venue info, podium highlight, full results table with grid,
  laps and race status
- **Dark mode** — class-based theming with FOUC-free initialization and a toggle
  persisted to `localStorage`
- **Resilience** — route-level error boundaries, per-query loading skeletons,
  error and empty states with retry, retry-safe API client
- **Performance** — route-level code splitting, TanStack Query caching

## Tech Stack

- **React 19** + **TypeScript** (strict mode) + **Vite 8**
- **Tailwind CSS v4** (CSS-first config) + **shadcn/ui** components
- **React Router v7** (route-level code splitting via `lazy`)
- **TanStack Query v5** (server state, caching, retries)
- **Zustand** (theme store with `localStorage` persistence)
- **Axios** (typed API client with error normalization)
- **Framer Motion** (page/section animations)
- **Recharts** (points bar chart, constructors' donut chart)
- **Lucide React** icons

## Data Source

Unofficial statistics powered by the [OpenF1 API](https://openf1.org/), the
open-source community API for real-time and historical Formula 1 data. It is
publicly accessible from the browser, requires no API key, and returns data from
the 2023 season onwards.

## Local Development

```bash
npm install
npm run dev
```

Start the Vite dev server at the printed URL (default `http://localhost:5173`).

## Production Build

```bash
npm run build      # typecheck (tsc -b) + production build
npm run preview    # serve the production build locally
```

Additional checks:

```bash
npm run typecheck  # TypeScript only
npm run lint       # ESLint (flat config, typescript-eslint, react-hooks)
```

## Environment Variables

| Variable                  | Required | Default                    | Description          |
| ------------------------- | -------- | -------------------------- | -------------------- |
| `VITE_OPENF1_BASE_URL`    | No       | `https://api.openf1.org/v1`| OpenF1 API base URL  |

The OpenF1 API does **not** require an API key. The default base URL is used
when the variable is not set, so no `.env` file is strictly required.

To override, copy the example file and edit it:

```bash
cp .env.example .env.local
```

## Deployment

The project is a static Vite + React single-page application and deploys to any
static host. It is ready for GitHub → Vercel:

1. Push this repository to GitHub.
2. In Vercel, import the repository.
3. Vercel auto-detects Vite; the framework preset is set automatically
   (build command `npm run build`, output directory `dist`).
4. Environment variables from `.env.example` can be added in the Vercel project
   settings if you want to override the API base URL (optional).
5. Deploy.

`vercel.json` rewrites all routes to `index.html` so client-side navigation and
deep links (e.g. `/races/<session>`) work on Vercel.
