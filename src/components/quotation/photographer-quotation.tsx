import { quotation } from '@/app/photographer/quotation/page'
import { Icon } from '@iconify/react'

interface PhotographerQuotationProps {
  quotations: quotation[]
}

export default function PhotographerQuotation({
  quotations,
}: PhotographerQuotationProps) {
  return (
    <div className='size-full'>
      {quotations.length == 0 ? (
        <div className='flex h-full flex-col items-center justify-center gap-3'>
          <Icon icon='lucide:sticky-note' className='size-20' />
          No Quotations To Show
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
          <div className='gap-2.5 text-2xl font-bold lg:px-10'>
            Latest Quotations
          </div>
          <div className='gap-2.5 text-2xl font-bold lg:px-10'>
            Create Quotation
          </div>
        </div>
      )}
    </div>
  )
}
