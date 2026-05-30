import { motion } from 'framer-motion'
import { useBuildProgress } from '../hooks/useBuildProgress'
import { stateColor } from '../lib/buildStateMachine'
import { CheckCircle2 } from 'lucide-react'

export default function ProgressSpine({ projectRef }: { projectRef?: string }) {
  const { progress, generating, sections } = useBuildProgress(projectRef)
  return (
    <div className='relative w-12 shrink-0 flex flex-col items-center py-6 border-r border-[#2a2e38] bg-[#0F1115]'>
      <div className='relative w-2.5 flex-1 rounded-full bg-[#1a1d24] overflow-hidden'>
        <motion.div
          className='absolute bottom-0 left-0 right-0 rounded-full'
          style={{ background: 'linear-gradient(to top, #FF5C2B, #ff8a5c)' }}
          initial={{ height: 0 }}
          animate={{ height: `${progress}%`, opacity: generating ? [1, 0.6, 1] : 1 }}
          transition={{ height: { duration: 0.8, ease: 'easeInOut' }, opacity: { duration: 1, repeat: generating ? Infinity : 0 } }}
        />
        {progress >= 100 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='absolute inset-0 rounded-full' style={{ background: 'linear-gradient(to top,#3DDC97,#5ef0b0)' }} />
        )}
      </div>
      <div className='mt-3 flex flex-col items-center gap-2'>
        {sections.map(s => (
          <div key={s.id} className='h-2 w-2 rounded-full transition-colors duration-300' style={{ background: stateColor(s.state as any) }} title={s.label} />
        ))}
      </div>
      <div className='mt-3 font-mono text-[9px] text-[#7E8794] [writing-mode:vertical-rl] rotate-180'>
        {progress >= 100 ? <span className='text-[#3DDC97] flex items-center gap-1'><CheckCircle2 size={10} /> SEALED</span> : `${Math.round(progress)}% POURED`}
      </div>
    </div>
  )
}