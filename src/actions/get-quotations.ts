import { client } from '@/api/client'
import { components } from '@/api/schema'

export interface Quotation {
  quotationID: number
  status: string
  packageName: string
  packageId: number
  photographerName: string
  photographerId: number
  customerName: string
  customerId: number
  from: Date
  to: Date
  description: string
  pricePerHour: number
}

export async function getQuotations(): Promise<Quotation[]> {
  const { data: quotations } = await client.GET('/api/v1/quotations')

  if (!quotations || !quotations.data) {
    return []
  }

  return quotations.data.map(
    (quotation: components['schemas']['dto.QuotationResponse']): Quotation => ({
      quotationID: quotation.id || 0,
      status: quotation.status || '',
      packageName: quotation.package?.name || '',
      packageId: quotation.package?.id || 0,
      photographerName: quotation.photographer?.name || '',
      photographerId: quotation.photographer?.id || 0,
      customerName: quotation.customer?.name || '',
      customerId: quotation.customer?.id || 0,
      from: new Date(quotation.fromDate || new Date()),
      to: new Date(quotation.toDate || new Date()),
      description: quotation.description || '',
      pricePerHour: quotation.price || 0,
    })
  )
}
