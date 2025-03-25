import { cn } from '@/lib/utils'
import type { QuotationStatus } from '@/types/quotation'
import { cva } from 'class-variance-authority'

export interface QuotationStatusTagProps {
  variant: QuotationStatus
}

const statusVariants = cva(
  'items-center inline-flex rounded-2xl text-sm font-normal',
  {
    variants: {
      variant: {
        PENDING: 'bg-amber-100 text-amber-700',
        CONFIRMED: 'bg-sky-100 text-sky-700',
        CANCELLED: 'bg-red-100 text-red-700',
        PAID: 'bg-emerald-100 text-emerald-700',
        SUBMITTED: 'bg-emerald-100 text-emerald-700',
        ACCEPTED: 'bg-violet-100 text-violet-700',
      },
      size: {
        default: 'px-2 py-1',
      },
    },
    defaultVariants: {
      variant: 'PENDING',
      size: 'default',
    },
  }
)

export function QuotationStatusTag({ variant }: QuotationStatusTagProps) {
  if (!variant) {
    variant = 'PENDING'
  }

  return <div className={cn(statusVariants({ variant }))}>{variant}</div>
}
