import * as React from 'react'
import { cn } from '../../lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
const variants = cva('inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none active:scale-[0.98]', {
  variants: {
    variant: {
      default: 'bg-[#FF5C2B] text-[#0F1115] hover:bg-[#ff6f44] font-semibold shadow-[0_4px_20px_-4px_rgba(255,92,43,0.5)] hover:shadow-[0_6px_28px_-4px_rgba(255,92,43,0.7)]',
      destructive: 'bg-red-600 text-white hover:bg-red-500',
      outline: 'border border-[#2a2e38] bg-transparent text-[#F2F4F7] hover:bg-[#181B22] hover:border-[#3a3f4a]',
      secondary: 'bg-[#181B22] text-[#F2F4F7] border border-[#2a2e38] hover:bg-[#20242d]',
      ghost: 'text-[#F2F4F7] hover:bg-[#181B22]',
      link: 'text-[#FF5C2B] underline-offset-4 hover:underline',
    },
    size: { default: 'h-11 px-5 py-2', sm: 'h-9 px-3', lg: 'h-12 px-8 text-base', icon: 'h-11 w-11' },
  },
  defaultVariants: { variant: 'default', size: 'default' },
})
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof variants> {}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => (
  <button ref={ref} className={cn(variants({ variant, size }), className)} {...props} />
))
Button.displayName = 'Button'