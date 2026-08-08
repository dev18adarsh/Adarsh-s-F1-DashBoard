import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { SITE } from '@/config/site'
import { NAV_ITEMS } from '@/config/nav'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Navbar } from '@/components/layout/navbar'
import { Sidebar } from '@/components/layout/sidebar'

function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-44 left-1/4 size-[520px] animate-pulse-glow rounded-full bg-primary/15 blur-[120px]" />
      <div className="absolute right-[-8rem] bottom-[-10rem] size-[480px] animate-pulse-glow rounded-full bg-primary/10 blur-[120px] [animation-delay:2s]" />
      <div className="absolute top-1/3 -left-28 size-80 rounded-full bg-primary/5 blur-[100px]" />
    </div>
  )
}

interface MobileSidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function MobileSidebar({ open, onOpenChange }: MobileSidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-72 gap-0 p-0">
        <SheetHeader className="sr-only">
          <SheetTitle>{SITE.name}</SheetTitle>
          <SheetDescription>Navigation</SheetDescription>
        </SheetHeader>
        <Sidebar
          items={NAV_ITEMS}
          onNavigate={() => onOpenChange(false)}
          className="h-full"
          footer={<ThemeToggle className="ml-1" />}
        />
      </SheetContent>
    </Sheet>
  )
}

export function AppLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="relative isolate flex min-h-dvh">
      <AmbientBackground />

      <Sidebar className="hidden w-64 shrink-0 lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:border-r lg:border-border/60 lg:bg-card/40 lg:py-5 lg:backdrop-blur-xl" />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar onOpenMobileNav={() => setMobileNavOpen(true)} />

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
          <Outlet />
        </main>

        <footer className="border-t border-border/60 py-6">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 text-center text-sm text-muted-foreground sm:flex-row sm:px-6">
            <p>
              © {new Date().getFullYear()} {SITE.name}
            </p>
            <p>
              Data via{' '}
              <a
                href={SITE.dataSource.url}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 hover:text-foreground"
              >
                {SITE.dataSource.label}
              </a>{' '}
              · Unofficial F1 statistics
            </p>
          </div>
        </footer>
      </div>

      <MobileSidebar open={mobileNavOpen} onOpenChange={setMobileNavOpen} />
    </div>
  )
}
