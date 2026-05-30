export function relTime(d: string) {
  const t = new Date(d).getTime(); const now = Date.now(); const s = Math.floor((now - t) / 1000)
  if (s < 60) return 'just now'
  const m = Math.floor(s / 60); if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60); if (h < 24) return `${h}h ago`
  const dd = Math.floor(h / 24); if (dd < 30) return `${dd}d ago`
  return new Date(d).toLocaleDateString()
}
export function pct(n: number) { return `${Math.round(n)}%` }
export function tokens(n: number) { if (n >= 1000) return `${(n/1000).toFixed(1)}k tok`; return `${n} tok` }