import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Flag } from 'lucide-react'

import { NAV_ITEMS, SITE, cn, type SidebarItem } from '@/utils'

interface SidebarProps {
  items?: SidebarItem[]
  footer?: ReactNode
  className?: string
  onNavigate?: () => void
}

export function Sidebar({ items = NAV_ITEMS, footer, className, onNavigate }: SidebarProps) {
  return (
    <div className={cn('flex flex-col gap-6 p-4', className)}>
      <NavLink
        to="/"
        onClick={onNavigate}
        className="group flex items-center gap-3 rounded-xl px-2 py-1"
      >
        <span className="relative flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff5b4d] via-primary to-[#a90400] text-primary-foreground shadow-glow transition-transform duration-300 group-hover:scale-105">
          <Flag className="size-5" />
        </span>
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate text-sm font-extrabold tracking-tight">{SITE.name}</span>
          <span className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            F1 Dashboard
          </span>
        </span>
      </NavLink>

      <nav className="flex flex-col gap-1">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-accent/70 text-foreground shadow-soft'
                  : 'text-muted-foreground hover:bg-accent/40 hover:text-foreground',
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={cn(
                    'size-4.5 shrink-0 transition-colors duration-200',
                    isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground',
                  )}
                />
                <span className="truncate">{label}</span>
                {isActive ? (
                  <span className="ml-auto size-1.5 shrink-0 rounded-full bg-primary shadow-glow" />
                ) : null}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {footer ? <div className="mt-auto">{footer}</div> : null}
    </div>
  )
}
