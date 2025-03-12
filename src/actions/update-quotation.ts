'use server'

import { client } from '@/api/client'

export interface QuotationAction {
  packageId: string
  customerId: string
  price: number
  from: Date
  to: Date
  description: string
}

export default async function updateQuotationAction(
  quotationId: number,
  payload: QuotationAction
) {
  await client.PATCH('/api/v1/photographer/quotations/{id}', {
    params: { path: { id: quotationId } },
    body: {
      quotationID: String(quotationId),
      customerId: parseInt(payload.customerId),
      packageId: parseInt(payload.packageId),
      price: payload.price,
      description: payload.description,
      fromDate: payload.from.toISOString(),
      toDate: payload.to.toISOString(),
    },
  })
}
