import CustomerQuotation from '@/components/customer-quotation/index'

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const quotationId = (await params).id
  return <CustomerQuotation id={quotationId} />
}
