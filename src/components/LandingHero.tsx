import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import ProofPreviewPane from './ProofPreviewPane'
import { HardHat, ArrowRight, Layers, Database, Zap } from 'lucide-react'

export default function LandingHero() {
  const nav = useNavigate()
  const stats = [{ v: '4', l: 'foundation blocks' }, { v: '<10s', l: 'to first scaffold' }, { v: 'live', l: 'realtime spine' }]
  return (
    <div className='min-h-screen bg-[#0F1115] blueprint-grid overflow-x-hidden'>
      <header className='flex items-center justify-between px-5 sm:px-10 py-5 border-b border-[#2a2e38]'>
        <div className='flex items-center gap-2.5'>
          <div className='h-9 w-9 rounded-md bg-[#FF5C2B] flex items-center justify-center text-[#0F1115]'><HardHat size={20} /></div>
          <span className='font-display text-lg font-bold tracking-tight'>BlueprintForge</span>
        </div>
        <Button variant='outline' size='sm' onClick={() => nav('/projects')}>Open Workbench</Button>
      </header>
      <main className='max-w-7xl mx-auto px-5 sm:px-10 py-12 lg:py-20 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center'>
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className='text-[#3DDC97] border-[#3DDC97]/40 mb-5 font-mono'>// AI-ASSISTED APP BUILDER</Badge>
            <h1 className='font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight'>Describe it.<br /><span className='text-[#FF5C2B]'>Watch it get built.</span></h1>
            <p className='mt-6 text-base sm:text-lg text-[#7E8794] max-w-md leading-relaxed'>Type what your app should do and the builder lays the foundation — schemas, screens, and logic wired together in real time.</p>
            <div className='mt-8 flex flex-wrap gap-3'>
              <Button size='lg' onClick={() => nav('/projects')}>Start building <ArrowRight size={18} /></Button>
            </div>
            <div className='mt-10 flex flex-wrap gap-x-8 gap-y-4'>
              {stats.map((s, i) => (
                <motion.div key={s.l} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
                  <div className='font-display text-2xl font-bold text-[#F2F4F7]'>{s.v}</div>
                  <div className='font-mono text-[10px] uppercase tracking-wider text-[#7E8794]'>{s.l}</div>
                </motion.div>
              ))}
            </div>
            <div className='mt-8 flex flex-wrap gap-6 text-sm'>
              {[{ i: <Database size={16} />, t: 'Auto schemas' }, { i: <Layers size={16} />, t: 'Live screens' }, { i: <Zap size={16} />, t: 'Realtime spine' }].map(f => (
                <div key={f.t} className='flex items-center gap-2 text-[#7E8794]'><span className='text-[#FF5C2B]'>{f.i}</span>{f.t}</div>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <div className='mb-4 rounded-lg border border-[#2a2e38] bg-[#181B22] p-4'>
            <span className='font-mono text-[10px] uppercase tracking-wider text-[#7E8794]'>typed prompt</span>
            <p className='mt-1.5 font-mono text-sm text-[#F2F4F7]'>“a booking app for a barbershop”</p>
          </div>
          <ProofPreviewPane />
        </motion.div>
      </main>
    </div>
  )
}