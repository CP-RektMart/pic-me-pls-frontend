import { getPackages } from '@/actions/photographer/package/get-packages'
import { getQuotations } from '@/actions/quotation/get-quotations'

import PhotographerQuotation from '@/components/photographer/quotations/photographer-quotation'

export default async function QuotationPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined }
}) {
  const param = await searchParams
  const quotations = await getQuotations()
  const packages = await getPackages()

  const customerId = param?.id ? Number(param.id) : undefined

  const createParam = param?.create
  const defaultWindow = createParam === '1' ? 'create' : null

  return (
    <PhotographerQuotation
      quotations={quotations}
      packages={packages}
      defaultCustomerId={customerId}
      defaultWindow={defaultWindow}
    />
  )
}
