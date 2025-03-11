'use server'

import { client } from '@/api/client'
import { type QuotationStatus } from '@/types/quotation'

import CustomerQuotation from '@/components/customer-quotation/index'

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const quotationId = (await params).id

  const { response, data } = await client.GET('/api/v1/quotations/{id}', {
    params: { path: { id: quotationId } },
  })

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

  console.log(data)

  const formatDate = (date: string) => {
    if (!date) {
      return ''
    }
    return new Date(date)
      .toLocaleString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
      .replace(/,/g, '')
  }

  const calculateDuration = (fromDate: string, toDate: string): number => {
    const from = new Date(fromDate)
    const to = new Date(toDate)
    const durationInHours = (to.getTime() - from.getTime()) / (1000 * 60 * 60)
    return Math.ceil(durationInHours)
  }

  const duration = calculateDuration(quotation.fromDate, quotation.toDate)

  const images = quotation.package?.media?.map((media) => ({
    url: media.pictureUrl || '',
    name: media.description || '',
  }))

  const quotationStatus =
    quotation.status[0] + quotation.status.slice(1).toLowerCase()

  return (
    <CustomerQuotation
      quotationId={quotationId}
      quotationStatus={quotationStatus as QuotationStatus}
      packageName={quotation.package?.name || 'Package'}
      photographerName={quotation.photographer?.name || 'Photographer'}
      customerName={quotation.customer?.name || 'Customer'}
      from={formatDate(quotation.fromDate)}
      to={formatDate(quotation.toDate)}
      description={quotation.description || ''}
      duration={duration}
      totalPrice={quotation.price || 0}
      photographerImageUrl={quotation.photographer?.profilePictureUrl || ''}
      packageNumber={quotation.photographer?.packages.length || 0}
      quotationImages={images || []}
    />
  )
}
