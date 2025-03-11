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
        Pending: 'bg-amber-100 text-amber-700',
        Confirm: 'bg-sky-100 text-sky-700',
        Cancelled: 'bg-red-100 text-red-700',
        Paid: 'bg-emerald-100 text-emerald-700',
      },
      size: {
        default: 'px-2 py-1',
      },
    },
    defaultVariants: {
      variant: 'Pending',
      size: 'default',
    },
  }
)

export function QuotationStatusTag({ variant }: QuotationStatusTagProps) {
  return <div className={cn(statusVariants({ variant }))}>{variant}</div>
}
