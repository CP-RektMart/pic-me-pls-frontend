import PhotographerQuotation from '@/components/quotation/photographer-quotation'
import { Button } from '@/components/ui/button'

export default function QuotationPage() {
  return (
    <div className='flex w-full flex-col gap-6 px-32 py-4'>
      <div className='flex flex-row justify-between'>
        <div className='text-2xl font-bold'>Quotation Manager</div>

        <Button>New Quotation</Button>
      </div>

      <PhotographerQuotation />
    </div>
  )
}
