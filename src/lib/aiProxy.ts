import { supabase } from './supabaseClient'
import { projectId, T } from './supabaseClient'

export type GenStep = { kind: string; label: string }

function analyze(prompt: string): { steps: GenStep[]; components: { type: string; label: string; props: any }[] } {
  const p = prompt.toLowerCase()
  const comps: { type: string; label: string; props: any }[] = []
  comps.push({ type: 'auth', label: 'Authentication', props: { method: 'Email + Password', desc: 'User accounts scoped to the app' } })
  comps.push({ type: 'data', label: 'Data Schema', props: { tables: 'users, records', desc: 'Core relational tables' } })

  if (/(book|appointment|reserv|schedul|calendar|barber|salon)/.test(p)) {
    comps.push({ type: 'screen', label: 'Calendar', props: { kind: 'Date picker grid', desc: 'Select available slots' } })
    comps.push({ type: 'screen', label: 'Staff List', props: { kind: 'List view', desc: 'Choose a provider' } })
    comps.push({ type: 'logic', label: 'Confirm Booking', props: { kind: 'Action', desc: 'Persist reservation + notify' } })
  } else if (/(shop|store|product|ecommerce|cart|checkout|sell)/.test(p)) {
    comps.push({ type: 'screen', label: 'Product Grid', props: { kind: 'Catalog', desc: 'Browse items' } })
    comps.push({ type: 'screen', label: 'Cart', props: { kind: 'List + totals', desc: 'Review selection' } })
    comps.push({ type: 'logic', label: 'Checkout', props: { kind: 'Action', desc: 'Process order' } })
  } else if (/(chat|message|social|feed|post|community)/.test(p)) {
    comps.push({ type: 'screen', label: 'Feed', props: { kind: 'Stream', desc: 'Realtime posts' } })
    comps.push({ type: 'screen', label: 'Compose', props: { kind: 'Form', desc: 'Create a post' } })
    comps.push({ type: 'logic', label: 'Realtime Sync', props: { kind: 'Channel', desc: 'Live updates' } })
  } else if (/(task|todo|project|manage|track|board)/.test(p)) {
    comps.push({ type: 'screen', label: 'Board', props: { kind: 'Kanban', desc: 'Organize tasks' } })
    comps.push({ type: 'screen', label: 'Detail View', props: { kind: 'Panel', desc: 'Edit a task' } })
    comps.push({ type: 'logic', label: 'Status Flow', props: { kind: 'State machine', desc: 'Move between columns' } })
  } else {
    comps.push({ type: 'screen', label: 'Dashboard', props: { kind: 'Overview', desc: 'Primary view' } })
    comps.push({ type: 'screen', label: 'Detail View', props: { kind: 'Panel', desc: 'Inspect a record' } })
    comps.push({ type: 'logic', label: 'Core Action', props: { kind: 'Action', desc: 'Primary workflow' } })
  }

  const steps: GenStep[] = [
    { kind: 'schema', label: 'Pour data schema' },
    { kind: 'auth', label: 'Wire authentication' },
    ...comps.filter(c => c.type === 'screen').map(c => ({ kind: 'screen', label: `Frame ${c.label}` })),
    { kind: 'logic', label: 'Cast business logic' },
    { kind: 'validate', label: 'Inspect & seal foundation' },
  ]
  return { steps, components: comps }
}

async function tryProxy(prompt: string) {
  try {
    const res = await fetch('https://api.nullsec.studio/proxy', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ appId: projectId, url: 'noop', method: 'POST', body: { prompt } })
    })
    if (!res.ok) return null
    return await res.json().catch(() => null)
  } catch { return null }
}

export async function runGeneration(projectRef: string, prompt: string, onProgress?: () => void) {
  await tryProxy(prompt)
  const plan = analyze(prompt)

  await supabase.from(T('prompts')).insert({ project_ref: projectRef, prompt_text: prompt, response: plan as any, tokens_used: Math.round(prompt.length * 1.4) + 120 })

  const stepRows = plan.steps.map((s, i) => ({ project_ref: projectRef, kind: s.kind, label: s.label, state: 'pending', order_index: i }))
  const { data: insertedSteps } = await supabase.from(T('build_steps')).insert(stepRows).select()
  const steps = insertedSteps || []

  await supabase.from(T('projects')).update({ status: 'building', build_progress: 0 }).eq('id', projectRef)

  const compQueue = [...plan.components]

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i]
    await supabase.from(T('build_steps')).update({ state: 'building' }).eq('id', step.id)
    onProgress?.()
    await delay(900)

    if (['schema', 'auth', 'screen', 'logic'].includes(step.kind) && compQueue.length) {
      let idx = compQueue.findIndex(c => (step.kind === 'schema' && c.type === 'data') || c.type === step.kind)
      if (idx === -1) idx = 0
      const comp = compQueue.splice(idx, 1)[0]
      await supabase.from(T('components')).insert({
        project_ref: projectRef, type: comp.type, label: comp.label,
        props: comp.props, connections: [], position: {}, validated: false
      })
    }

    await supabase.from(T('build_steps')).update({ state: 'validated' }).eq('id', step.id)
    const prog = Math.round(((i + 1) / steps.length) * 100)
    await supabase.from(T('projects')).update({ build_progress: prog }).eq('id', projectRef)
    onProgress?.()
    await delay(350)
  }

  for (const comp of compQueue) {
    await supabase.from(T('components')).insert({ project_ref: projectRef, type: comp.type, label: comp.label, props: comp.props, connections: [], position: {}, validated: false })
  }

  await supabase.from(T('components')).update({ validated: true }).eq('project_ref', projectRef)
  await supabase.from(T('projects')).update({ status: 'ready', build_progress: 100 }).eq('id', projectRef)
  onProgress?.()
}

function delay(ms: number) { return new Promise(r => setTimeout(r, ms)) }