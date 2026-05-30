import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useRealtimeChannel() {
  const [status, setStatus] = useState<'connecting'|'connected'|'offline'>('connecting')
  useEffect(() => {
    const ch = supabase.channel('health').subscribe((s) => {
      if (s === 'SUBSCRIBED') setStatus('connected')
      else if (s === 'CHANNEL_ERROR' || s === 'TIMED_OUT') setStatus('offline')
    })
    const onOnline = () => setStatus('connected'); const onOffline = () => setStatus('offline')
    window.addEventListener('online', onOnline); window.addEventListener('offline', onOffline)
    if (!navigator.onLine) setStatus('offline')
    return () => { supabase.removeChannel(ch); window.removeEventListener('online', onOnline); window.removeEventListener('offline', onOffline) }
  }, [])
  return { status }
}