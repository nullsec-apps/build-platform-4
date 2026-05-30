import { useBuildSteps } from '../hooks/useBuildSteps'
import { Badge } from './ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Loader2, Circle } from 'lucide-react'

export default function BuildStepTimeline({ projectRef }: { projectRef?: string }) {
  const { steps, loading } = useBuildSteps(projectRef)
  if (loading) return <div className='p-4 space-y-2'>{[0,1,2].map(i => <div key={i} className='h-10 animate-pulse bg-[#20242d] rounded' />)}</div>
  if (!steps.length) return <p className='p-4 text-xs text-[#7E8794] font-mono'>// no build steps yet — submit a prompt</p>
  return (
    <div className='p-4 space-y-2'>
      <h4 className='font-mono text-[10px] uppercase tracking-wider text-[#7E8794] mb-2'>// construction permits</h4>
      <AnimatePresence>
        {steps.map(s => (
          <motion.div key={s.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className='flex items-center gap-3 rounded border border-[#2a2e38] bg-[#181B22] px-3 py-2'>
            {s.state === 'validated' ? <CheckCircle2 size={16} className='text-[#3DDC97]' /> : s.state === 'building' ? <Loader2 size={16} className='text-[#FF5C2B] animate-spin' /> : <Circle size={16} className='text-[#7E8794]' />}
            <span className='flex-1 text-sm text-[#F2F4F7]'>{s.label}</span>
            <Badge className={s.state === 'validated' ? 'text-[#3DDC97] border-[#3DDC97]/40' : s.state === 'building' ? 'text-[#FF5C2B] border-[#FF5C2B]/40' : 'text-[#7E8794]'}>{s.state}</Badge>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}