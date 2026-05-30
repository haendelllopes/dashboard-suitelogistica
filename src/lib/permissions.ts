import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export type Role = 'admin' | 'manager' | 'viewer'

export async function requireAuth() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  return session
}

export async function requireRole(role: Role) {
  const session = await requireAuth()
  // Futuramente: verificar role no banco
  return session
}

export function canEdit(role: Role): boolean {
  return role === 'admin' || role === 'manager'
}

export function canAdmin(role: Role): boolean {
  return role === 'admin'
}
