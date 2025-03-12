import { getPackages } from '@/actions/get-packages'
import { getQuotations } from '@/actions/get-quotations'

import PhotographerQuotation from '@/components/quotation/photographer-quotation'

export default function QuotationPage() {
  const quotations = getQuotations()
  const packages = getPackages()

  return <PhotographerQuotation quotations={quotations} packages={packages} />
}
