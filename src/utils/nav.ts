import { Flag, LayoutDashboard, Trophy, type LucideIcon } from 'lucide-react'

export interface SidebarItem {
  to: string
  label: string
  icon: LucideIcon
  end?: boolean
}

export const NAV_ITEMS: SidebarItem[] = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/standings', label: 'Standings', icon: Trophy },
  { to: '/races', label: 'Races', icon: Flag },
]
