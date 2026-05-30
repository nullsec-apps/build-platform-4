import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => { setUser(data.user); setLoading(false) }).catch(() => setLoading(false))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => { setUser(session?.user ?? null) })
    return () => { sub.subscription.unsubscribe() }
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }, [])
  const signUp = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
  }, [])
  const signOut = useCallback(async () => { await supabase.auth.signOut() }, [])

  return { user, loading, signIn, signUp, signOut }
}