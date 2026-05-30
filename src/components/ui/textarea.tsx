import * as React from 'react'
import { cn } from '../../lib/utils'
export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn('flex min-h-[80px] w-full rounded-md border border-[#2a2e38] bg-[#0F1115] px-3 py-2 text-base text-[#F2F4F7] placeholder:text-[#7E8794] focus-visible:outline-none focus-visible:border-[#FF5C2B] focus-visible:ring-2 focus-visible:ring-[#FF5C2B]/20 transition-all duration-200 resize-none', className)} {...props} />
))
Textarea.displayName = 'Textarea'