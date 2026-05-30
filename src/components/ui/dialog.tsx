import * as React from 'react'
import { cn } from '../../lib/utils'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
const Ctx = React.createContext<{ open: boolean; setOpen: (o: boolean) => void }>({ open: false, setOpen: () => {} })
export function Dialog({ open, onOpenChange, children }: { open: boolean; onOpenChange: (o: boolean) => void; children: React.ReactNode }) {
  return <Ctx.Provider value={{ open, setOpen: onOpenChange }}>{children}</Ctx.Provider>
}
export function DialogContent({ className, children }: { className?: string; children: React.ReactNode }) {
  const { open, setOpen } = React.useContext(Ctx)
  return (
    <AnimatePresence>
      {open && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4' onClick={() => setOpen(false)}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='absolute inset-0 bg-black/70 backdrop-blur-sm' />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 12 }} transition={{ type: 'spring', stiffness: 300, damping: 26 }} className={cn('relative z-10 w-full max-w-lg rounded-lg border border-[#2a2e38] bg-[#181B22] p-6 max-h-[90vh] overflow-y-auto', className)} onClick={e => e.stopPropagation()}>
            <button onClick={() => setOpen(false)} className='absolute right-4 top-4 text-[#7E8794] hover:text-[#F2F4F7] transition-colors'><X size={18} /></button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
export const DialogHeader = ({ children }: { children: React.ReactNode }) => <div className='mb-4'>{children}</div>
export const DialogTitle = ({ children }: { children: React.ReactNode }) => <h2 className='font-display text-xl font-bold text-[#F2F4F7]'>{children}</h2>
export const DialogTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>