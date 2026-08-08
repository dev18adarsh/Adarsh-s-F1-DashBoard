import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

import { Button } from '@/components/ui'

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <p className="text-7xl font-black text-primary">404</p>
      <h1 className="text-2xl font-bold tracking-tight">Page not found</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        The page you're looking for doesn't exist or has been moved to the pits.
      </p>
      <Button asChild className="mt-2 gap-2">
        <Link to="/">
          <Home className="size-4" />
          Back to dashboard
        </Link>
      </Button>
    </div>
  )
}
