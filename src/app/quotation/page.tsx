import { getQuotations } from '@/actions/get-quotations'

import QuotationList from '@/components/customer-quotation/list'

export default async function Page() {
  const quotations = await getQuotations()
  return <QuotationList quotations={quotations} />
}
