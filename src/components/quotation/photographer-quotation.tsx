import { quotation } from '@/app/photographer/quotation/page'

interface PhotographerQuotationProps {
  quotations: quotation[]
}

export default function PhotographerQuotation({
  quotations,
}: PhotographerQuotationProps) {
  return (
    <div className='w-full'>
      {quotations.length == 0 ? <div>No Quotations</div> : null}
    </div>
  )
}
