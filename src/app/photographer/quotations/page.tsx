import { getPackages } from '@/actions/photographer/package/get-packages'
import { getQuotations } from '@/actions/quotation/get-quotations'

import PhotographerQuotation from '@/components/photographer/quotations/photographer-quotation'

interface SearchParams {
  id?: string
  create?: string
}

export default async function QuotationPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>
}) {
  const param = await searchParams

  const quotations = await getQuotations()
  const packages = await getPackages()

  const customerId = param?.id ? parseInt(param.id, 10) || undefined : undefined
  const defaultWindow = param?.create === '1' ? 'create' : null

  return (
    <PhotographerQuotation
      quotations={quotations}
      packages={packages}
      defaultCustomerId={customerId}
      defaultWindow={defaultWindow}
    />
  )
}
