import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Loader2, FileText } from 'lucide-react'
import { toast } from 'sonner'

export default function NewProjectDialog({ open, onOpenChange, onCreate }: { open: boolean; onOpenChange: (o: boolean) => void; onCreate: (d: { name: string; description: string; initial_prompt: string }) => Promise<any> }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [prompt, setPrompt] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!name.trim()) return
    setBusy(true)
    try {
      await onCreate({ name: name.trim(), description: description.trim(), initial_prompt: prompt.trim() })
      toast.success('Permit filed — site is ready')
      setName(''); setDescription(''); setPrompt(''); onOpenChange(false)
    } catch (err: any) { toast.error(err.message || 'Failed to create') }
    finally { setBusy(false) }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className='flex items-center gap-2 text-[#FF5C2B] mb-1'><FileText size={16} /><span className='font-mono text-[10px] uppercase tracking-wider'>CONSTRUCTION PERMIT</span></div>
          <DialogTitle>File a new build</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className='space-y-4'>
          <div className='space-y-1.5'><Label>Project Name *</Label><Input value={name} onChange={e => setName(e.target.value)} placeholder='Barbershop Booking' required /></div>
          <div className='space-y-1.5'><Label>Description</Label><Input value={description} onChange={e => setDescription(e.target.value)} placeholder='What does it do?' /></div>
          <div className='space-y-1.5'><Label>Initial Prompt</Label><Textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder='a booking app for a barbershop with staff selection and confirmation' rows={3} /></div>
          <Button type='submit' className='w-full' disabled={busy}>{busy ? <Loader2 className='animate-spin' size={18} /> : 'File permit & open site'}</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}