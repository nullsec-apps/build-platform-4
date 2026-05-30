import { useState, useCallback } from 'react'
import { projectId } from '../lib/supabaseClient'

export function useAssetUpload() {
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)

  const upload = useCallback(async (file: File): Promise<string> => {
    setUploading(true); setProgress(10)
    try {
      const base64Data: string = await new Promise((res, rej) => {
        const r = new FileReader()
        r.onload = () => res((r.result as string).split(',')[1])
        r.onerror = rej
        r.readAsDataURL(file)
      })
      setProgress(50)
      const resp = await fetch('https://api.nullsec.studio/upload', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appId: projectId, filename: file.name, base64Data, contentType: file.type })
      })
      setProgress(90)
      const json = await resp.json().catch(() => ({}))
      setProgress(100)
      return json.url || ''
    } finally { setTimeout(() => { setUploading(false); setProgress(0) }, 600) }
  }, [])

  return { upload, progress, uploading }
}