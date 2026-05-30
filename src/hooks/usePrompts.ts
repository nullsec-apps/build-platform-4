import { useCallback, useEffect, useState } from 'react'
import { supabase, T } from '../lib/supabaseClient'
import { runGeneration } from '../lib/aiProxy'

export type Prompt = { id: string; project_ref: string; prompt_text: string; response: any; tokens_used: number; created_at: string }

export function usePrompts(ref?: string) {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [loading, setLoading] = useState(false)

  const load = useCallback(async () => {
    if (!ref) return
    const { data } = await supabase.from(T('prompts')).select('*').eq('project_ref', ref).order('created_at', { ascending: false })
    setPrompts((data || []) as any)
  }, [ref])

  useEffect(() => { load() }, [load])

  const submit = useCallback(async (text: string) => {
    if (!ref || !text.trim()) return
    setLoading(true)
    try {
      await runGeneration(ref, text.trim(), () => {})
      await load()
    } finally { setLoading(false) }
  }, [ref, load])

  return { prompts, submit, loading, reload: load }
}