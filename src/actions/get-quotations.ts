import { client } from '@/api/client'

export interface Quotation {
  quotationID: number
  status: string
  packageName: string
  packageId: string
  photographerName: string
  photographerId: string
  customerName: string
  customerId: string
  from: Date
  to: Date
  description: string
  pricePerHour: number
  // TODO: category
}

export async function getQuotations(): Promise<Quotation[]> {
  const { data: quotations } = await client.GET('/api/v1/quotations')

  return quotations?.data?.map(
    (q: {
      id: string
      status: string
      package: { name: string; id: string; price: number }
      photographer: { name: string; id: string }
      customer: { name: string; id: string }
      fromDate: string
      toDate: string
      description: string
    }): Quotation =>
      ({
        quotationID: parseInt(q.id),
        status: q.status,
        packageName: q.package.name,
        packageId: q.package.id,
        photographerName: q.photographer.name,
        photographerId: q.photographer.id,
        customerName: q.customer.name,
        customerId: q.customer.id,
        from: new Date(q.fromDate),
        to: new Date(q.toDate),
        description: q.description,
        pricePerHour: q.package.price,
      }) || []
  )
}
