import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { createAdminClient } from '@/lib/supabase'

const ALLOWED_DOMAIN = 'totvs.com.br'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      const email = user.email ?? ''

      if (!email.endsWith(`@${ALLOWED_DOMAIN}`)) {
        return `/login?error=DomainNotAllowed`
      }

      try {
        const supabase = createAdminClient()
        await supabase.from('users').upsert(
          {
            id: user.id ?? email,
            email,
            name: user.name,
            image: user.image,
            role: 'viewer',
            last_login: new Date().toISOString(),
          },
          { onConflict: 'email' }
        )
      } catch (err) {
        console.error('Erro ao salvar usuário:', err)
      }

      return true
    },

    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },

    async jwt({ token, user }) {
      if (user) token.sub = user.id
      return token
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}
