import { ReactNode, createContext, useState, useEffect } from 'react'

import { supabase } from '../../services/supabase'

import type { User } from '@supabase/supabase-js'

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
    const session = supabase.auth.session()

    setUser(session?.user ?? null)

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
      const { error } = await supabase.auth.signIn({
        provider: 'google'
      })

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
