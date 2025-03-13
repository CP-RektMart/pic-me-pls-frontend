import { getPackages } from '@/actions/photographer/package/get-packages'
import { getQuotations } from '@/actions/quotation/get-quotations'

import PhotographerQuotation from '@/components/quotation/photographer-quotation'

export default async function QuotationPage() {
  const quotations = await getQuotations()
  const packages = await getPackages()

  return <PhotographerQuotation quotations={quotations} packages={packages} />
}
