import { getQuotations } from '@/actions/quotation/get-quotations'

import { QuotationList } from '@/components/customer-quotation/quotation-list'

export default async function Page() {
  const quotations = await getQuotations()
  return <QuotationList quotations={quotations} />
}
