import { motion } from 'framer-motion'
import { Badge } from './ui/badge'
import { Database, Lock, Layers, Zap, CheckCircle2, Clock } from 'lucide-react'
import type { Comp } from '../hooks/useComponents'
import { cn } from '../lib/utils'

const ICONS: Record<string, JSX.Element> = {
  auth: <Lock size={16} />, data: <Database size={16} />, screen: <Layers size={16} />, logic: <Zap size={16} />,
}

export default function BlueprintTile({ comp, selected, onSelect }: { comp: Comp; selected: boolean; onSelect: () => void }) {
  return (
    <motion.button
      onClick={onSelect}
      initial={{ opacity: 0, scale: 0.85, y: -8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 18 }}
      whileHover={{ y: -2 }}
      className={cn('group relative text-left w-full rounded-lg border bg-[#181B22] p-4 transition-colors duration-200', selected ? 'border-[#FF5C2B] shadow-[0_0_0_1px_rgba(255,92,43,0.4)]' : 'border-[#2a2e38] hover:border-[#3a3f4a]')}
    >
      <div className='absolute -top-2 -left-2 h-4 w-4 border-l-2 border-t-2 border-[#FF5C2B]/40 group-hover:border-[#FF5C2B] transition-colors' />
      <div className='absolute -bottom-2 -right-2 h-4 w-4 border-r-2 border-b-2 border-[#FF5C2B]/40 group-hover:border-[#FF5C2B] transition-colors' />
      <div className='flex items-center justify-between mb-2'>
        <div className='flex items-center gap-2 text-[#FF5C2B]'>{ICONS[comp.type] || <Layers size={16} />}<span className='font-display text-sm font-semibold text-[#F2F4F7]'>{comp.label}</span></div>
        {comp.validated ? <Badge className='text-[#3DDC97] border-[#3DDC97]/40 gap-1'><CheckCircle2 size={10} />OK</Badge> : <Badge className='text-[#7E8794] gap-1'><Clock size={10} />WIP</Badge>}
      </div>
      <p className='text-xs text-[#7E8794] mb-2'>{comp.props?.desc || comp.props?.kind || 'Component'}</p>
      <div className='flex items-center justify-between font-mono text-[9px] text-[#7E8794] border-t border-dashed border-[#2a2e38] pt-2'>
        <span className='uppercase'>{comp.type}</span>
        <span>{comp.props?.tables || comp.props?.method || comp.props?.kind || '—'}</span>
      </div>
    </motion.button>
  )
}