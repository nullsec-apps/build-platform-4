import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProjects } from '../hooks/useProjects'
import { useAuth } from '../hooks/useAuth'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import NewProjectDialog from './NewProjectDialog'
import { relTime, pct } from '../lib/format'
import { HardHat, Plus, Trash2, ArrowRight, AlertTriangle, FileStack } from 'lucide-react'
import { toast } from 'sonner'

const SAMPLE = { id: 'sample', name: 'Barbershop Booking', description: 'a booking app for a barbershop', status: 'ready', build_progress: 62, created_at: new Date().toISOString() }

function statusColor(s: string) {
  if (s === 'ready') return 'text-[#3DDC97] border-[#3DDC97]/40'
  if (s === 'building') return 'text-[#FF5C2B] border-[#FF5C2B]/40'
  return 'text-[#7E8794] border-[#2a2e38]'
}

export default function ProjectsDashboard() {
  const nav = useNavigate()
  const { projects, loading, error, createProject, deleteProject } = useProjects()
  const { signOut } = useAuth()
  const [dialog, setDialog] = useState(false)

  const create = async (d: any) => {
    const p = await createProject(d)
    if (p?.id) nav(`/build/${p.id}`)
  }

  return (
    <div className='min-h-screen bg-[#0F1115] blueprint-grid'>
      <header className='flex items-center justify-between px-5 sm:px-10 py-5 border-b border-[#2a2e38]'>
        <div className='flex items-center gap-2.5 cursor-pointer' onClick={() => nav('/')}>
          <div className='h-9 w-9 rounded-md bg-[#FF5C2B] flex items-center justify-center text-[#0F1115]'><HardHat size={20} /></div>
          <span className='font-display text-lg font-bold'>BlueprintForge</span>
        </div>
        <div className='flex items-center gap-2'>
          <Button onClick={() => setDialog(true)}><Plus size={18} /> <span className='hidden sm:inline'>New Build</span></Button>
          <Button variant='ghost' size='sm' onClick={() => signOut()}>Sign out</Button>
        </div>
      </header>

      <main className='max-w-7xl mx-auto px-5 sm:px-10 py-8 sm:py-10'>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className='mb-8'>
          <Badge className='text-[#3DDC97] border-[#3DDC97]/40 mb-3 font-mono'>// YOUR BUILD SITE</Badge>
          <h1 className='font-display text-3xl sm:text-4xl font-extrabold'>Every project is a blueprint</h1>
          <p className='mt-2 text-[#7E8794] max-w-xl'>File a permit, describe your app, and watch the foundation pour — schemas, screens, and logic poured live on the canvas.</p>
        </motion.div>

        {loading ? (
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>{[0,1,2].map(i => <Card key={i}><CardContent className='p-6'><div className='h-32 animate-pulse bg-[#20242d] rounded' /></CardContent></Card>)}</div>
        ) : error ? (
          <Card><CardContent className='p-10 text-center'><AlertTriangle className='mx-auto text-[#FF5C2B] mb-3' size={28} /><p className='text-[#7E8794]'>{error}</p></CardContent></Card>
        ) : projects.length === 0 ? (
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <Card className='border-dashed opacity-70 h-full'>
                <CardContent className='p-6'>
                  <Badge className='text-[#7E8794] mb-3 font-mono'>SAMPLE BLUEPRINT</Badge>
                  <h3 className='font-display text-lg font-semibold'>{SAMPLE.name}</h3>
                  <p className='mt-1 text-sm text-[#7E8794]'>{SAMPLE.description}</p>
                  <div className='mt-4 h-1.5 rounded-full bg-[#2a2e38] overflow-hidden'><div className='h-full bg-[#FF5C2B]' style={{ width: pct(SAMPLE.build_progress) }} /></div>
                  <p className='mt-2 font-mono text-[10px] text-[#7E8794]'>{pct(SAMPLE.build_progress)} POURED · EXAMPLE</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className='border-dashed border-[#FF5C2B]/40 flex items-center justify-center min-h-[200px] h-full cursor-pointer hover:bg-[#181B22] hover:border-[#FF5C2B] transition-all duration-200' onClick={() => setDialog(true)}>
                <CardContent className='text-center p-6'>
                  <FileStack className='mx-auto text-[#FF5C2B] mb-2' size={28} />
                  <p className='font-display font-semibold'>File your first permit</p>
                  <p className='text-xs text-[#7E8794] mt-1'>Start a real build</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        ) : (
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            {projects.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className='group hover:border-[#FF5C2B]/50 transition-colors h-full'>
                  <CardContent className='p-6'>
                    <div className='flex items-start justify-between mb-3'>
                      <Badge className={`font-mono ${statusColor(p.status)}`}>{p.status.toUpperCase()}</Badge>
                      <button onClick={() => { if(confirm('Demolish this build?')) { deleteProject(p.id); toast.success('Build demolished') } }} className='text-[#7E8794] hover:text-[#FF5C2B] opacity-0 group-hover:opacity-100 transition-all duration-200'><Trash2 size={16} /></button>
                    </div>
                    <h3 className='font-display text-lg font-semibold'>{p.name}</h3>
                    <p className='mt-1 text-sm text-[#7E8794] line-clamp-2'>{p.description || 'No description'}</p>
                    <div className='mt-4 h-1.5 rounded-full bg-[#2a2e38] overflow-hidden'><div className='h-full bg-gradient-to-r from-[#FF5C2B] to-[#ff8a5c] transition-all duration-500' style={{ width: pct(p.build_progress || 0) }} /></div>
                    <div className='mt-3 flex items-center justify-between'>
                      <span className='font-mono text-[10px] text-[#7E8794]'>{pct(p.build_progress || 0)} · {relTime(p.created_at)}</span>
                      <Button size='sm' variant='ghost' onClick={() => nav(`/build/${p.id}`)}>Open <ArrowRight size={14} /></Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
      <NewProjectDialog open={dialog} onOpenChange={setDialog} onCreate={create} />
    </div>
  )
}