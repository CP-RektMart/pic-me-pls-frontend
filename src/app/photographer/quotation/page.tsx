import { packages } from '@/actions/get-packages'
import { quotations } from '@/actions/get-quotations'

import PhotographerQuotation from '@/components/quotation/photographer-quotation'

export default function QuotationPage() {
  return <PhotographerQuotation quotations={quotations} packages={packages} />
}
