import { useEffect, useState } from 'react'
import { supabase, T } from '../lib/supabaseClient'
import type { Project } from './useProjects'

export function useProject(id?: string) {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) { setLoading(false); return }
    let active = true
    setLoading(true)
    supabase.from(T('projects')).select('*').eq('id', id).single().then(({ data }) => {
      if (active) { setProject(data as any); setLoading(false) }
    })
    const ch = supabase.channel(`proj_${id}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: T('projects'), filter: `id=eq.${id}` }, (payload) => {
        if (active) setProject(payload.new as any)
      }).subscribe()
    return () => { active = false; supabase.removeChannel(ch) }
  }, [id])

  return { project, loading }
}