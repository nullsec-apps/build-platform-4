import { createClient } from '@supabase/supabase-js'
const url = (import.meta as any).env?.VITE_SUPABASE_URL || (window as any).__NULLSEC__?.supabaseUrl
const key = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || (window as any).__NULLSEC__?.supabaseAnonKey
export const supabase = createClient(url || 'https://placeholder.supabase.co', key || 'placeholder')
export const projectId = (window as any).__NULLSEC__?.projectId || 'demo'
export const T = (name: string) => `app_${projectId}_${name}`