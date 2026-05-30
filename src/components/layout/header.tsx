'use client'

import { signOut } from 'next-auth/react'
import Image from 'next/image'

interface HeaderProps {
  user: { name?: string | null; email?: string | null; image?: string | null }
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
      <div>
        <p className="text-sm font-semibold text-gray-900">Bom dia, {user.name?.split(' ')[0] ?? 'Dev'} 👋</p>
        <p className="text-xs text-gray-400">{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
      </div>

      <div className="flex items-center gap-3">
        <span className="badge badge-green">Online</span>

        <div className="flex items-center gap-2">
          {user.image ? (
            <Image src={user.image} alt={user.name ?? ''} width={32} height={32} className="rounded-full" />
          ) : (
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {user.name?.[0] ?? 'U'}
            </div>
          )}
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="btn-secondary px-3 py-1.5 text-xs"
        >
          Sair
        </button>
      </div>
    </header>
  )
}
