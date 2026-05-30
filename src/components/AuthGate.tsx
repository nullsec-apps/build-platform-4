import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { Card, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { Loader2, HardHat } from 'lucide-react'
import { toast } from 'sonner'

export default function AuthGate({ children }: { children?: any }) {
  const { user, loading, signIn, signUp } = useAuth()
  const [tab, setTab] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)

  if (loading) return <div className='min-h-screen flex items-center justify-center bg-[#0F1115]'><Loader2 className='animate-spin text-[#FF5C2B]' size={32} /></div>
  if (user) return <>{children}</>

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true)
    try {
      if (tab === 'signin') { await signIn(email, password); toast.success('Welcome back to the site') }
      else { await signUp(email, password); toast.success('Account created — sign in to start building') }
    } catch (err: any) { toast.error(err.message || 'Authentication failed') }
    finally { setBusy(false) }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#0F1115] blueprint-grid p-4'>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className='w-full max-w-md'>
        <Card>
          <CardContent className='p-8'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='h-11 w-11 rounded-md bg-[#FF5C2B] flex items-center justify-center text-[#0F1115]'><HardHat size={22} strokeWidth={2} /></div>
              <div>
                <h1 className='font-display text-xl font-bold'>Site Access</h1>
                <p className='text-xs text-[#7E8794] uppercase tracking-wider font-mono'>PERMIT REQUIRED · BLUEPRINTFORGE</p>
              </div>
            </div>
            <Tabs value={tab} onValueChange={setTab} className='mb-6'>
              <TabsList className='w-full'>
                <TabsTrigger value='signin'>Sign In</TabsTrigger>
                <TabsTrigger value='signup'>Register</TabsTrigger>
              </TabsList>
            </Tabs>
            <form onSubmit={submit} className='space-y-4'>
              <div className='space-y-1.5'><Label>Email</Label><Input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='founder@startup.co' required /></div>
              <div className='space-y-1.5'><Label>Password</Label><Input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='••••••••' required minLength={6} /></div>
              <Button type='submit' className='w-full' disabled={busy}>{busy ? <Loader2 className='animate-spin' size={18} /> : tab === 'signin' ? 'Enter the site' : 'Create account'}</Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}