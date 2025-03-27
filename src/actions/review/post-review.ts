'use server'

import { client } from '@/api/client'

export default async function postReview(
  quotationId: number,
  ratingScore: number,
  comment: string | undefined
) {
  const { error } = await client.POST(
    '/api/v1/customer/quotations/{quotationId}/review',
    {
      params: { path: { quotationId: quotationId } },
      body: {
        quotationID: quotationId,
        rating: ratingScore,
        comment: comment,
      },
    }
  )
  console.log('error', error)
  if (error) {
    return error
  }
}
