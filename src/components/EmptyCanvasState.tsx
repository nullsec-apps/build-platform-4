import { motion } from 'framer-motion'
import { Card, CardContent } from './ui/card'
import { Lock, Database, Layers } from 'lucide-react'

export default function EmptyCanvasState({ suggestion }: { suggestion?: string }) {
  const blocks = [
    { icon: <Lock size={18} />, label: 'Auth', code: 'PERMIT-001' },
    { icon: <Database size={18} />, label: 'Data', code: 'PERMIT-002' },
    { icon: <Layers size={18} />, label: 'Screen', code: 'PERMIT-003' },
  ]
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='flex flex-col items-center justify-center h-full text-center py-16 px-4'>
      <span className='font-mono text-[10px] uppercase tracking-wider text-[#7E8794] mb-1'>// empty foundation</span>
      <h2 className='font-display text-2xl font-bold mb-2'>Lay the first stone</h2>
      <p className='text-sm text-[#7E8794] max-w-md mb-8'>{suggestion ? `Try: "${suggestion}"` : 'Describe your app below and the builder pours these foundation blocks in real time.'}</p>
      <div className='grid grid-cols-3 gap-3 sm:gap-4 max-w-xl w-full'>
        {blocks.map((b, i) => (
          <motion.div key={b.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.1 }}>
            <Card className='border-dashed opacity-60'>
              <CardContent className='p-4 flex flex-col items-center gap-2'>
                <span className='text-[#7E8794]'>{b.icon}</span>
                <span className='font-display text-sm font-semibold'>{b.label}</span>
                <span className='font-mono text-[9px] text-[#7E8794]'>{b.code}</span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}