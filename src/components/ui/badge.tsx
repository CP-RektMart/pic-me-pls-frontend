import * as React from 'react'

import { cn } from '@/lib/utils'
import { type VariantProps, cva } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center rounded-3xl border px-2 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow ',
        secondary: 'border-transparent bg-secondary text-secondary-foreground ',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow ',
        outline: 'text-foreground',
        photographer: 'bg-blue-100 border-none text-xs text-blue-700',
        customer: 'bg-gray-100 border-none text-xs text-black',
        admin: 'bg-red-100 border-none text-xs text-red-700',
        customer_um: 'bg-orange-100 border-none text-xs text-base-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
