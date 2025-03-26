'use server'

import { client } from '@/api/client'

export default async function postReview(
  quotationId: string,
  ratingScore: number,
  comment: string | undefined
) {
  const { error } = await client.POST(
    '/api/v1/customer/quotations/{id}/review',
    {
      params: { path: { id: quotationId } },
      body: {
        id: quotationId,
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
