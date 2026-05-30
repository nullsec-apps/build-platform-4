import { motion } from 'framer-motion'
import { Badge } from './ui/badge'
import { Calendar, Users, CheckCircle2 } from 'lucide-react'

export default function ProofPreviewPane() {
  const blocks = [
    { icon: <Calendar size={16} />, label: 'Calendar', dim: '320 × 240' },
    { icon: <Users size={16} />, label: 'Staff List', dim: '320 × 160' },
    { icon: <CheckCircle2 size={16} />, label: 'Confirm', dim: '320 × 88' },
  ]
  return (
    <div className='relative rounded-lg border border-[#2a2e38] bg-[#0F1115] blueprint-grid p-6 overflow-hidden'>
      <div className='absolute left-0 top-0 bottom-0 w-1.5 bg-[#2a2e38]'>
        <motion.div initial={{ height: 0 }} animate={{ height: '62%' }} transition={{ duration: 1.4, ease: 'easeInOut' }} className='w-full bg-gradient-to-t from-[#FF5C2B] to-[#ff8a5c]' />
      </div>
      <div className='pl-4 space-y-3'>
        <div className='flex items-center justify-between'>
          <span className='font-mono text-[10px] uppercase tracking-wider text-[#7E8794]'>// generated scaffold</span>
          <Badge className='text-[#FF5C2B] border-[#FF5C2B]/40'>62% POURED</Badge>
        </div>
        {blocks.map((b, i) => (
          <motion.div key={b.label} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.25 }} className='relative rounded border border-dashed border-[#3a3f4a] bg-[#181B22]/60 p-3'>
            <div className='flex items-center gap-2 text-[#3DDC97]'>{b.icon}<span className='font-display text-sm font-semibold text-[#F2F4F7]'>{b.label}</span></div>
            <span className='absolute right-2 top-2 font-mono text-[9px] text-[#7E8794]'>{b.dim}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}