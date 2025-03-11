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

export default async function createQuotationAction(payload: QuotationAction) {
  await client.POST('/api/v1/photographer/quotations', {
    body: {
      customerId: parseInt(payload.customerId),
      packageId: parseInt(payload.packageId),
      price: payload.price,
      description: payload.description,
      fromDate: payload.from.toISOString(),
      toDate: payload.to.toISOString(),
    },
  })

  return
}
