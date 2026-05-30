import { useCallback, useEffect, useState } from 'react'
import { supabase, T } from '../lib/supabaseClient'

export type Comp = { id: string; project_ref: string; type: string; label: string; props: any; connections: any[]; position: any; validated: boolean; created_at: string }

export function useComponents(ref?: string) {
  const [components, setComponents] = useState<Comp[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    if (!ref) { setLoading(false); return }
    let active = true
    const fetchAll = async () => {
      const { data } = await supabase.from(T('components')).select('*').eq('project_ref', ref).order('created_at', { ascending: true })
      if (active) { setComponents((data || []) as any); setLoading(false) }
    }
    fetchAll()
    const ch = supabase.channel(`comps_${ref}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: T('components'), filter: `project_ref=eq.${ref}` }, () => { fetchAll() })
      .subscribe()
    return () => { active = false; supabase.removeChannel(ch) }
  }, [ref])

  const select = useCallback((id: string | null) => setSelectedId(id), [])
  const selected = components.find(c => c.id === selectedId) || null

  const updateComponent = useCallback(async (id: string, d: Partial<Comp>) => {
    await supabase.from(T('components')).update(d).eq('id', id)
  }, [])

  return { components, loading, selected, select, updateComponent }
}