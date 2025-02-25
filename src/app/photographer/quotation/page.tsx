import PhotographerQuotation from '@/components/quotation/photographer-quotation'
import { Button } from '@/components/ui/button'

export interface quotation {
  quotationID: string
  status: string
  packageName: string
  photographerName: string
  customerName: string
  from: Date
  to: Date
  description: string
  pricePerHour: number
}

const quotations: quotation[] = [
  {
    quotationID: 'Q0001',
    status: 'Pending',
    packageName: 'Wedding Package',
    photographerName: 'John Doe',
    customerName: 'Jane Doe',
    from: new Date('2022-01-01 08:00'),
    to: new Date('2022-01-02 08:00'),
    description: 'Wedding photography package',
    pricePerHour: 400,
  },
]

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
