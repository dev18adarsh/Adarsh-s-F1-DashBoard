import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'

import { AppLayout } from '@/layouts'
import { ErrorBoundary, PageLoader } from '@/components/shared'

const HomePage = lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })))
const StandingsPage = lazy(() =>
  import('@/pages/StandingsPage').then((m) => ({ default: m.StandingsPage })),
)
const RacesPage = lazy(() => import('@/pages/RacesPage').then((m) => ({ default: m.RacesPage })))
const RaceDetailPage = lazy(() =>
  import('@/pages/RaceDetailPage').then((m) => ({ default: m.RaceDetailPage })),
)
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="standings" element={<StandingsPage />} />
              <Route path="races" element={<RacesPage />} />
              <Route path="races/:round" element={<RaceDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  )
}
