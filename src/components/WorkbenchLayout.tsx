import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useProject } from '../hooks/useProject'
import { usePrompts } from '../hooks/usePrompts'
import { useComponents } from '../hooks/useComponents'
import CommandRail from './CommandRail'
import ProgressSpine from './ProgressSpine'
import BuildCanvas from './BuildCanvas'
import Inspector from './Inspector'
import PromptComposer from './PromptComposer'
import BuildStepTimeline from './BuildStepTimeline'
import PromptHistoryPanel from './PromptHistoryPanel'
import AssetUploader from './AssetUploader'
import ConnectionStatusBar from './ConnectionStatusBar'
import MobilePreviewSheet from './MobilePreviewSheet'
import { Loader2, ArrowLeft } from 'lucide-react'
import { relTime } from '../lib/format'
import type { Comp } from '../hooks/useComponents'

export default function WorkbenchLayout() {
  const { id } = useParams()
  const nav = useNavigate()
  const { project, loading } = useProject(id)
  const { submit, loading: gen } = usePrompts(id)
  const { updateComponent } = useComponents(id)
  const [railTab, setRailTab] = useState('build')
  const [selected, setSelected] = useState<Comp | null>(null)

  if (loading) return <div className='min-h-screen flex items-center justify-center bg-[#0F1115]'><Loader2 className='animate-spin text-[#FF5C2B]' size={32} /></div>
  if (!project) return <div className='min-h-screen flex flex-col items-center justify-center bg-[#0F1115] gap-3'><p className='text-[#7E8794]'>Build not found</p><button onClick={() => nav('/projects')} className='text-[#FF5C2B] hover:underline'>Back to sites</button></div>

  const suggestion = project.initial_prompt || `a ${project.name.toLowerCase()} app`
  const handleSubmit = (t: string) => submit(t)

  return (
    <div className='h-screen flex flex-col bg-[#0F1115] overflow-hidden'>
      <div className='flex flex-1 overflow-hidden'>
        <CommandRail active={railTab} onNav={setRailTab} />
        <div className='flex-1 flex flex-col overflow-hidden'>
          <header className='flex items-center gap-3 px-4 sm:px-6 py-3 border-b border-[#2a2e38]'>
            <button onClick={() => nav('/projects')} className='text-[#7E8794] hover:text-[#F2F4F7] md:hidden transition-colors'><ArrowLeft size={18} /></button>
            <div className='min-w-0'>
              <h1 className='font-display text-lg font-bold truncate'>{project.name}</h1>
              <p className='text-xs text-[#7E8794] truncate'>{project.description || 'Describe it. Watch it get built.'}</p>
            </div>
          </header>

          <div className='hidden md:flex flex-1 overflow-hidden'>
            <ProgressSpine projectRef={id} />
            {railTab === 'build' ? (
              <>
                <div className='flex-1 flex flex-col overflow-hidden'>
                  <BuildCanvas projectRef={id} suggestion={suggestion} onSelectComp={setSelected} />
                  <PromptComposer onSubmit={handleSubmit} loading={gen} suggestion={suggestion} />
                </div>
                <AnimatePresence mode='wait'>
                  {selected ? (
                    <Inspector key='inspector' comp={selected} onClose={() => setSelected(null)} onUpdate={updateComponent} />
                  ) : (
                    <div key='timeline' className='w-[340px] shrink-0 border-l border-[#2a2e38] overflow-y-auto'>
                      <BuildStepTimeline projectRef={id} />
                      <AssetUploader />
                    </div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <div className='flex-1 overflow-hidden'><PromptHistoryPanel projectRef={id} onRerun={handleSubmit} /></div>
            )}
          </div>

          <div className='md:hidden flex-1 overflow-hidden'>
            <MobilePreviewSheet projectRef={id} suggestion={suggestion} onSubmit={handleSubmit} loading={gen} onSelectComp={setSelected} />
          </div>

          <ConnectionStatusBar lastSaved={relTime(project.created_at)} />
        </div>
      </div>
    </div>
  )
}