import { packages } from '@/actions/get-packages'
import { quotations } from '@/actions/get-quotations'

import PhotographerQuotation from '@/components/quotation/photographer-quotation'

export default function QuotationPage() {
  return (
    <div className='flex w-full flex-col gap-6 px-4 py-4 lg:px-32'>
      <PhotographerQuotation quotations={quotations} packages={packages} />
    </div>
  )
}
