import * as React from 'react'
import { cn } from '../../lib/utils'
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn('flex h-12 w-full rounded-md border border-[#2a2e38] bg-[#0F1115] px-3 py-2 text-base text-[#F2F4F7] placeholder:text-[#7E8794] focus-visible:outline-none focus-visible:border-[#FF5C2B] focus-visible:ring-2 focus-visible:ring-[#FF5C2B]/20 transition-all duration-200', className)} {...props} />
))
Input.displayName = 'Input'