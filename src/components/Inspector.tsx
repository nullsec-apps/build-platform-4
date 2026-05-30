import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Switch } from './ui/switch'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { X, Save } from 'lucide-react'
import type { Comp } from '../hooks/useComponents'
import { toast } from 'sonner'

export default function Inspector({ comp, onClose, onUpdate }: { comp: Comp | null; onClose: () => void; onUpdate: (id: string, d: Partial<Comp>) => Promise<void> }) {
  const [label, setLabel] = useState('')
  const [desc, setDesc] = useState('')
  const [validated, setValidated] = useState(false)

  useEffect(() => { if (comp) { setLabel(comp.label); setDesc(comp.props?.desc || ''); setValidated(comp.validated) } }, [comp])

  if (!comp) return null
  const save = async () => {
    await onUpdate(comp.id, { label, props: { ...comp.props, desc }, validated })
    toast.success('Spec sheet updated')
  }
  return (
    <motion.div initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className='w-full md:w-[340px] shrink-0 border-l border-[#2a2e38] bg-[#0F1115] flex flex-col'>
      <div className='flex items-center justify-between px-4 py-3 border-b border-[#2a2e38]'>
        <div><span className='font-mono text-[10px] uppercase tracking-wider text-[#FF5C2B]'>// spec sheet</span><h3 className='font-display font-semibold'>{comp.label}</h3></div>
        <button onClick={onClose} className='text-[#7E8794] hover:text-[#F2F4F7] transition-colors'><X size={18} /></button>
      </div>
      <div className='flex-1 overflow-y-auto p-4 space-y-5'>
        <div className='flex items-center gap-2'><Badge className='text-[#FF5C2B] border-[#FF5C2B]/40 uppercase'>{comp.type}</Badge>{comp.validated && <Badge className='text-[#3DDC97] border-[#3DDC97]/40'>VALIDATED</Badge>}</div>
        <div className='space-y-1.5'><Label>Component Label</Label><Input value={label} onChange={e => setLabel(e.target.value)} /></div>
        <div className='space-y-1.5'><Label>Description</Label><Input value={desc} onChange={e => setDesc(e.target.value)} /></div>
        <div className='space-y-2 rounded border border-[#2a2e38] p-3'>
          <Label>Technical Properties</Label>
          {Object.entries(comp.props || {}).filter(([k]) => k !== 'desc').map(([k, v]) => (
            <div key={k} className='flex justify-between font-mono text-xs py-1 border-b border-dashed border-[#2a2e38] last:border-0'><span className='text-[#7E8794] uppercase'>{k}</span><span className='text-[#F2F4F7]'>{String(v)}</span></div>
          ))}
        </div>
        <div className='flex items-center justify-between'><Label>Mark validated</Label><Switch checked={validated} onCheckedChange={setValidated} /></div>
      </div>
      <div className='p-4 border-t border-[#2a2e38]'><Button onClick={save} className='w-full'><Save size={16} /> Save spec</Button></div>
    </motion.div>
  )
}