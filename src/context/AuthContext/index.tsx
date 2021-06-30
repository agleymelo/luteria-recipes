import { ReactNode, createContext, useState, useEffect } from 'react'

import { supabase } from '../../services/supabase'

import type { Session } from '@supabase/supabase-js'

type AuthContextType = {
  session: Session | null
  handleSignInWithGoogle: () => Promise<void>
  handleSignOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

type AuthContextProps = {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProps) {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [session])

  async function handleSignInWithGoogle() {
    try {
      const { session, error } = await supabase.auth.signIn({
        provider: 'google'
      })

      if (error) throw error

      const { user } = session as Session

      if (!user) return

      if (session && user) {
        if (user.app_metadata.provider === 'google') {
          if (!user.email || !user.user_metadata.full_name || !user.user_metadata.avatar_url) {
            throw new Error('Missing information from Google Account.')
          }
        }
      }
    } catch (err) {
      console.log(err.error_description || err.message)
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut()

    setSession(null)
  }

  return <AuthContext.Provider value={{ session, handleSignInWithGoogle, handleSignOut }}>{children}</AuthContext.Provider>
}
