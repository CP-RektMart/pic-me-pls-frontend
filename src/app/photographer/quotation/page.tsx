import PhotographerQuotation from '@/components/quotation/photographer-quotation'
import { Button } from '@/components/ui/button'

export interface quotation {
  quotationID: string
  status: string
  packageName: string
  photographerName: string
  customerName: string
  from: string
  to: string
  description: string
  duration: string
  totalPrice: number
}

const quotations: quotation[] = []

export default function QuotationPage() {
  return (
    <div className='flex w-full flex-col gap-6 px-4 py-4 lg:px-32'>
      <div className='flex flex-row justify-between'>
        <div className='text-2xl font-bold'>Quotation Manager</div>

        <Button>New Quotation</Button>
      </div>

      <PhotographerQuotation quotations={quotations} />
    </div>
  )
}
