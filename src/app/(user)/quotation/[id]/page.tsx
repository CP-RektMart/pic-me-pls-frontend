import { client } from '@/api/client'
import { calculateDurationFromString, formatDateToString } from '@/lib/utils'
import { Review } from '@/types/package'
import { type QuotationStatus } from '@/types/quotation'

import CustomerQuotation from '@/components/quotation/index'

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ payment?: string }>
}

export default async function Page({ params, searchParams }: PageProps) {
  const quotationId = parseInt((await params).id)
  const paymentStatus = (await searchParams).payment

  const { response, data } = await client.GET('/api/v1/quotations/{id}', {
    params: { path: { id: quotationId } },
  })

  if (response.status === 404) {
    return <p>Quotation not found</p>
  }

  if (response.status !== 200) {
    return <p>Internal server error</p>
  }

  const quotation = data?.result

  if (
    !quotation ||
    !quotation.fromDate ||
    !quotation.toDate ||
    !quotation.status
  ) {
    return <p>Internal server error</p>
  }

  const images = quotation.package?.media?.map((media) => ({
    url: media.pictureUrl || '',
    name: media.description || '',
  }))

  const duration = calculateDurationFromString(
    quotation.fromDate,
    quotation.toDate
  )

  return (
    <CustomerQuotation
      quotationId={quotationId}
      quotationStatus={quotation.status as QuotationStatus}
      packageName={quotation.package?.name || 'Package'}
      photographerName={quotation.photographer?.name || 'Photographer'}
      isPhotographerVerified={quotation.photographer?.isVerified || false}
      customerName={quotation.customer?.name || 'Customer'}
      from={formatDateToString(new Date(quotation.fromDate))}
      to={formatDateToString(new Date(quotation.toDate))}
      description={quotation.description || ''}
      duration={duration}
      totalPrice={quotation.price || 0}
      photographerImageUrl={quotation.photographer?.profilePictureUrl || ''}
      packageNumber={quotation.photographer?.packages?.length || 0}
      quotationImages={images || []}
      review={quotation.review as Review}
      paymentStatus={paymentStatus || ''}
    />
  )
}
