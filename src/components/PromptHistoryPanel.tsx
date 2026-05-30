import { usePrompts } from '../hooks/usePrompts'
import { motion } from 'framer-motion'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { relTime, tokens } from '../lib/format'
import { RotateCw, MessageSquare } from 'lucide-react'

export default function PromptHistoryPanel({ projectRef, onRerun }: { projectRef?: string; onRerun: (t: string) => void }) {
  const { prompts } = usePrompts(projectRef)
  return (
    <div className='p-4 space-y-3 overflow-y-auto h-full'>
      <h4 className='font-mono text-[10px] uppercase tracking-wider text-[#7E8794]'>// prompt log ({prompts.length})</h4>
      {prompts.length === 0 ? (
        <div className='text-center py-12 text-[#7E8794]'><MessageSquare className='mx-auto mb-2' size={24} /><p className='text-sm'>No prompts yet</p><p className='text-xs mt-1 opacity-70'>Submit a prompt in the Build tab to start the log</p></div>
      ) : prompts.map((p, i) => (
        <motion.div key={p.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
          <Card className='group hover:border-[#FF5C2B]/40 transition-colors'>
            <CardContent className='p-4'>
              <p className='text-sm text-[#F2F4F7] mb-2'>{p.prompt_text}</p>
              <div className='flex items-center justify-between'>
                <span className='font-mono text-[10px] text-[#7E8794]'>{relTime(p.created_at)} · {tokens(p.tokens_used || 0)}</span>
                <Button size='sm' variant='ghost' onClick={() => onRerun(p.prompt_text)}><RotateCw size={14} /> Re-run</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}