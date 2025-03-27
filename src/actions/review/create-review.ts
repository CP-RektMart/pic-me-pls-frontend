'use server'

import { client } from '@/api/client'
import { components } from '@/api/schema'
import { revalidatePath } from 'next/cache'

export type Review = components['schemas']['dto.CreateReviewRequest']

export const createReview = async (payload: Review) => {
  if (!payload) return

  await client.POST('/api/v1/customer/quotations/{quotationId}/review', {
    params: {
      path: {
        quotationId: payload.quotationID,
      },
    },
    body: {
      quotationID: payload.quotationID,
      comment: payload.comment,
      rating: payload.rating,
    },
  })

  revalidatePath(`/quotation/${payload.quotationID}`)
}
