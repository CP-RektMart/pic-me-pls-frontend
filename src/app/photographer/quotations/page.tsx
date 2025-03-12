import { getPackages } from '@/actions/get-packages'
import { getQuotations } from '@/actions/get-quotations'

import PhotographerQuotation from '@/components/quotation/photographer-quotation'

export default async function QuotationPage() {
  const quotations = await getQuotations()
  const packages = await getPackages()

  return <PhotographerQuotation quotations={quotations} packages={packages} />
}
