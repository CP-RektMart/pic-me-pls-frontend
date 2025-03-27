'use server'

import { client } from '@/api/client'
import { components } from '@/api/schema'
import { revalidatePath } from 'next/cache'

export type Review = components['schemas']['dto.UpdateReviewRequest']

export const updateReview = async (payload: Review) => {
  if (!payload) return

  console.log(payload)

  await client.PATCH('/api/v1/customer/quotations/{quotationId}/review/{id}', {
    params: {
      path: {
        quotationId: payload.quotationID,
        id: payload.id,
      },
    },
    body: {
      id: payload.id,
      quotationID: payload.quotationID,
      comment: payload.comment,
      rating: payload.rating,
    },
  })

  revalidatePath(`/quotation/${payload.quotationID}`)
}
