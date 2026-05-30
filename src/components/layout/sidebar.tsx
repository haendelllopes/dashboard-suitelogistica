'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'

const navItems = [
  { href: '/dashboard',              label: 'Overview',       icon: '📊' },
  { href: '/dashboard/planejamento', label: 'Planejamento',   icon: '📋' },
  { href: '/dashboard/suporte',      label: 'Suporte',        icon: '🎧' },
  { href: '/dashboard/fluxo',        label: 'Fluxo Dev',      icon: '🔀' },
  { href: '/dashboard/time',         label: 'Time',           icon: '👥' },
  { href: '/dashboard/devs',         label: 'Devs',           icon: '💻' },
  { href: '/dashboard/montecarlo',   label: 'Monte Carlo',    icon: '🎲' },
  { href: '/dashboard/multirrelease',label: 'Multi-release',  icon: '🚀' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 shrink-0 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
            WMS
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Suite</p>
            <p className="text-xs text-gray-400">Logística</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(item => {
          const isActive = item.href === '/dashboard'
            ? pathname === '/dashboard'
            : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              )}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-200">
        <p className="text-xs text-gray-400 text-center">TOTVS · Suite Logística</p>
      </div>
    </aside>
  )
}
