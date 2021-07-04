import { ReactNode, createContext, useState, useEffect } from 'react'

import type { User } from '@supabase/supabase-js'

import { supabase } from '../../services/supabase'

type AuthContextType = {
  user: User | null
  handleSignInWithGoogle: () => Promise<void>
  handleSignOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

type AuthContextProps = {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProps) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check if existe a active session and sets user
    const current_user = supabase.auth.user()

    setUser(current_user)

    // Event Lister for changes on auth (SignIn, signOut, etc..)
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener?.unsubscribe()
    }
  }, [])

  async function handleSignInWithGoogle() {
    try {
      const { error } = await supabase.auth.signIn(
        {
          provider: 'google'
        },
        {
          redirectTo: '/'
        }
      )

      if (error) {
        alert(error)
      }
    } catch (err) {
      console.log(err.error_description || err.message)
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
  }

  return <AuthContext.Provider value={{ user, handleSignInWithGoogle, handleSignOut }}>{children}</AuthContext.Provider>
}
