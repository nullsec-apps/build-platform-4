import * as React from 'react'
import { cn } from '../../lib/utils'
export function Badge({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('inline-flex items-center rounded border border-[#2a2e38] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider', className)} {...props} />
}