import * as React from 'react'
import { cn } from '../../lib/utils'
const Ctx = React.createContext<{ value: string; setValue: (v: string) => void }>({ value: '', setValue: () => {} })
export function Tabs({ value, onValueChange, children, className }: { value: string; onValueChange: (v: string) => void; children: React.ReactNode; className?: string }) {
  return <Ctx.Provider value={{ value, setValue: onValueChange }}><div className={className}>{children}</div></Ctx.Provider>
}
export const TabsList = ({ className, children }: { className?: string; children: React.ReactNode }) => <div className={cn('inline-flex gap-1 rounded-md border border-[#2a2e38] bg-[#0F1115] p-1', className)}>{children}</div>
export function TabsTrigger({ value, children }: { value: string; children: React.ReactNode }) {
  const { value: v, setValue } = React.useContext(Ctx)
  return <button onClick={() => setValue(value)} className={cn('flex-1 rounded px-4 py-1.5 text-sm font-medium transition-all duration-200', v === value ? 'bg-[#FF5C2B] text-[#0F1115]' : 'text-[#7E8794] hover:text-[#F2F4F7]')}>{children}</button>
}
export function TabsContent({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const { value: v } = React.useContext(Ctx)
  if (v !== value) return null
  return <div className={className}>{children}</div>
}