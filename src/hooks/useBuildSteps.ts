import { useEffect, useState } from 'react'
import { supabase, T } from '../lib/supabaseClient'

export type BuildStep = { id: string; project_ref: string; kind: string; label: string; state: 'pending'|'building'|'validated'; order_index: number; created_at: string }

export function useBuildSteps(ref?: string) {
  const [steps, setSteps] = useState<BuildStep[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!ref) { setLoading(false); return }
    let active = true
    const fetchAll = async () => {
      const { data } = await supabase.from(T('build_steps')).select('*').eq('project_ref', ref).order('order_index', { ascending: true })
      if (active) { setSteps((data || []) as any); setLoading(false) }
    }
    fetchAll()
    const ch = supabase.channel(`steps_${ref}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: T('build_steps'), filter: `project_ref=eq.${ref}` }, () => { fetchAll() })
      .subscribe()
    return () => { active = false; supabase.removeChannel(ch) }
  }, [ref])

  return { steps, loading }
}