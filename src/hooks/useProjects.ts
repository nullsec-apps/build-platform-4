import { useCallback, useEffect, useState } from 'react'
import { supabase, T } from '../lib/supabaseClient'

export type Project = { id: string; owner_id?: string; name: string; description?: string; initial_prompt?: string; status: string; build_progress?: number; config?: any; created_at: string }

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from(T('projects')).select('*').order('created_at', { ascending: false })
      if (error) throw error
      setProjects(data || [])
      setError(null)
    } catch (e: any) { setError(e.message || 'Failed to load') }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  const createProject = useCallback(async (d: { name: string; description?: string; initial_prompt?: string }) => {
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase.from(T('projects')).insert({
      name: d.name, description: d.description || '', initial_prompt: d.initial_prompt || '', status: 'draft', build_progress: 0, owner_id: user?.id || null
    }).select().single()
    if (error) throw error
    await load()
    return data
  }, [load])

  const deleteProject = useCallback(async (id: string) => {
    await supabase.from(T('components')).delete().eq('project_ref', id)
    await supabase.from(T('build_steps')).delete().eq('project_ref', id)
    await supabase.from(T('prompts')).delete().eq('project_ref', id)
    await supabase.from(T('projects')).delete().eq('id', id)
    await load()
  }, [load])

  return { projects, loading, error, createProject, deleteProject, reload: load }
}