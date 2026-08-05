# Adarsh's F1 Dashboard

Real-time Formula One Analytics, Statistics & Insights.

A modern React dashboard for the current Formula One season — live championship
standings, the race calendar and per-race results — built with a strict,
scalable, typed architecture. All data comes from the open [Jolpica API]
(Ergast successor), no mock data.

## Tech Stack

- **React 19** + **TypeScript** (strict mode) + **Vite 8**
- **Tailwind CSS v4** (CSS-first config) + **shadcn/ui** components
- **React Router v7** (route-level code splitting via `lazy`)
- **TanStack Query v5** (server state, caching, retries, refetch)
- **Zustand** (theme store with `localStorage` persistence)
- **Axios** (typed API client with error normalization)
- **Framer Motion** (page/section animations)
- **Recharts** (points bar chart, constructors' donut chart)
- **Lucide React** icons

## Getting Started

```bash
npm install
npm run dev       # start the dev server
npm run build     # typecheck (tsc -b) + production build
npm run lint      # ESLint (flat config, typescript-eslint, react-hooks)
npm run format    # Prettier (with tailwindcss plugin)
```

## Project Structure

```
src/
├── api/                 # Axios client, typed fetchers, TanStack Query hooks
├── components/
│   ├── ui/              # shadcn/ui primitives (button, card, tabs, sheet, ...)
│   ├── layout/          # App shell: sticky header, mobile nav, footer
│   ├── shared/          # ErrorBoundary, QueryBoundary, skeletons, StatCard
│   ├── charts/          # Recharts components
│   ├── standings/       # Standings tables
│   └── races/           # Race cards + results tables
├── config/              # Site metadata, F1 team colors
├── hooks/               # Reusable hooks (chart theme colors)
├── lib/                 # cn(), formatting helpers, domain utils
├── pages/               # Route pages (lazy loaded)
└── stores/              # Zustand stores (theme)
```

## Features

- **Dashboard** — championship leader stats, points bar chart, constructors'
  points share donut, latest race results, upcoming races
- **Standings** — full Drivers' and Constructors' championship tables (tabs)
- **Races** — the full season calendar split into Upcoming / Completed
- **Race details** — venue info, podium highlight, full results table
- **Dark mode** — class-based theming with FOUC-free initialization and a
  toggle persisted to `localStorage`
- **Resilience** — route-level error boundaries, per-query loading skeletons,
  error states with retry, code splitting

## Data Source

Unofficial statistics powered by the [Jolpica API](https://api.jolpi.ca/ergast/f1/),
the community-maintained continuation of the Ergast Developer API.
