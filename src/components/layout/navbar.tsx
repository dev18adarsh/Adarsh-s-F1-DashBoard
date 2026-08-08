import { Link } from 'react-router-dom'
import { Flag, Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/search-bar'
import { ThemeToggle } from '@/components/ui/theme-toggle'

interface NavbarProps {
  onOpenMobileNav: () => void
}

export function Navbar({ onOpenMobileNav }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full lg:hidden"
          onClick={onOpenMobileNav}
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </Button>

        <Link to="/" className="lg:hidden" aria-label="Go to dashboard">
          <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#ff5b4d] via-primary to-[#a90400] text-primary-foreground shadow-glow">
            <Flag className="size-4" />
          </span>
        </Link>

        <SearchBar
          placeholder="Search races, drivers, teams…"
          containerClassName="flex-1 sm:flex-none sm:w-80 lg:w-96"
        />

        <div className="ml-auto flex items-center gap-1.5">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
