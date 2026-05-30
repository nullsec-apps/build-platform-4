import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs'
import { ChevronUp, Monitor } from 'lucide-react'
import BuildCanvas from './BuildCanvas'
import PromptComposer from './PromptComposer'
import BuildStepTimeline from './BuildStepTimeline'
import ProgressSpine from './ProgressSpine'

export default function MobilePreviewSheet({ projectRef, suggestion, onSubmit, loading, onSelectComp }: any) {
  const [open, setOpen] = useState(true)
  const [tab, setTab] = useState('prompt')
  return (
    <div className='md:hidden flex flex-col h-full'>
      <div className='flex flex-1 overflow-hidden'>
        <ProgressSpine projectRef={projectRef} />
        <BuildCanvas projectRef={projectRef} suggestion={suggestion} onSelectComp={onSelectComp} />
      </div>
      <button onClick={() => setOpen(o => !o)} className='flex items-center justify-center gap-2 border-t border-[#2a2e38] bg-[#181B22] py-3 text-sm text-[#F2F4F7] transition-colors hover:bg-[#20242d]'>
        <ChevronUp size={16} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} /> {open ? 'Hide tools' : 'Build tools'}
      </button>
      {open && (
        <div className='border-t border-[#2a2e38] bg-[#0F1115] max-h-[55vh] overflow-y-auto'>
          <div className='p-3'><Tabs value={tab} onValueChange={setTab}><TabsList className='w-full'><TabsTrigger value='prompt'>Prompt</TabsTrigger><TabsTrigger value='steps'>Steps</TabsTrigger></TabsList></Tabs></div>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsContent value='prompt'><PromptComposer onSubmit={onSubmit} loading={loading} suggestion={suggestion} /></TabsContent>
            <TabsContent value='steps'><BuildStepTimeline projectRef={projectRef} /></TabsContent>
          </Tabs>
          <div className='p-3 border-t border-[#2a2e38] flex items-center gap-2 text-xs text-[#7E8794]'><Monitor size={14} /> Heavy editing is smoother on desktop</div>
        </div>
      )}
    </div>
  )
}