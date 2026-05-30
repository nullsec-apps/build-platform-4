import { useComponents } from '../hooks/useComponents'
import BlueprintTile from './BlueprintTile'
import EmptyCanvasState from './EmptyCanvasState'
import { Loader2 } from 'lucide-react'

export default function BuildCanvas({ projectRef, suggestion, onSelectComp }: { projectRef?: string; suggestion?: string; onSelectComp: (c: any) => void }) {
  const { components, loading, selected, select } = useComponents(projectRef)
  return (
    <div className='flex-1 blueprint-grid overflow-y-auto relative'>
      {loading ? (
        <div className='flex items-center justify-center h-full'><Loader2 className='animate-spin text-[#FF5C2B]' size={28} /></div>
      ) : components.length === 0 ? (
        <EmptyCanvasState suggestion={suggestion} />
      ) : (
        <div className='p-4 sm:p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 content-start'>
          {components.map(c => (
            <BlueprintTile key={c.id} comp={c} selected={selected?.id === c.id} onSelect={() => { select(c.id); onSelectComp(c) }} />
          ))}
        </div>
      )}
    </div>
  )
}