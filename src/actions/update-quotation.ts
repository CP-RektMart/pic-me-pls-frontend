'use server'

import { client } from '@/api/client'

export interface QuotationAction {
  package: string
  customer: string
  from: Date
  to: Date
  description: string
}

export default async function updateQuotationAction(
  quotationId: number,
  payload: QuotationAction
) {
  //TODO: Find package -> packageId, package.price, found?

  //TODO: Find customer -> customerId, found?

  await client.PATCH(`/api/v1/photographer/quotations/{id}`, {
    params: { path: { id: quotationId } },
    body: {
      customerId: 0,
      packageId: 0,
      price: 0,
      description: payload.description,
      fromDate: payload.from.toISOString(),
      toDate: payload.to.toISOString(),
    },
  })

  return
}
