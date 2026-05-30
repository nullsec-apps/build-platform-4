import { useState } from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Send, Loader2, Sparkles } from 'lucide-react'

export default function PromptComposer({ onSubmit, loading, suggestion }: { onSubmit: (t: string) => void; loading: boolean; suggestion?: string }) {
  const [text, setText] = useState('')
  const submit = () => { if (text.trim() && !loading) { onSubmit(text); setText('') } }
  return (
    <div className='border-t border-[#2a2e38] bg-[#0F1115] p-4'>
      {suggestion && !text && (
        <button onClick={() => setText(suggestion)} className='mb-2 inline-flex'><Badge className='text-[#3DDC97] border-[#3DDC97]/40 gap-1 cursor-pointer hover:bg-[#181B22] transition-colors'><Sparkles size={10} />Try: {suggestion}</Badge></button>
      )}
      <div className='flex gap-2 items-end'>
        <Textarea value={text} onChange={e => setText(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) submit() }} placeholder='Describe it. Watch it get built...' rows={2} className='flex-1' disabled={loading} />
        <Button onClick={submit} disabled={loading || !text.trim()} size='lg' className='h-[68px] px-5'>{loading ? <Loader2 className='animate-spin' size={18} /> : <Send size={18} />}</Button>
      </div>
      <p className='mt-1.5 font-mono text-[10px] text-[#7E8794]'>⌘+ENTER to pour · AI assembles schema, screens & logic live</p>
    </div>
  )
}