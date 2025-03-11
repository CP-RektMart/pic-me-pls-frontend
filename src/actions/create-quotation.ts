'use server'

import { client } from '@/api/client'

export interface QuotationAction {
  packageId: number
  customerId: number
  price: number
  from: Date
  to: Date
  description: string
}

export default async function createQuotationAction(payload: QuotationAction) {

  await client.POST('/api/v1/photographer/quotations', {
    body: {
      customerId: payload.customerId,
      packageId: payload.packageId,
      price: payload.price,
      description: payload.description,
      fromDate: payload.from.toISOString(),
      toDate: payload.to.toISOString(),
    },
  })
}
