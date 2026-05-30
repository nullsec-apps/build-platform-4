import * as React from 'react'
import { cn } from '../../lib/utils'
export function Switch({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (c: boolean) => void }) {
  return (
    <button onClick={() => onCheckedChange(!checked)} className={cn('relative h-6 w-11 rounded-full transition-colors duration-200', checked ? 'bg-[#3DDC97]' : 'bg-[#2a2e38]')}>
      <span className={cn('absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-200', checked ? 'translate-x-5' : 'translate-x-0.5')} />
    </button>
  )
}