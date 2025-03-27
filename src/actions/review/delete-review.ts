'use server'

import { client } from '@/api/client'
import { revalidatePath } from 'next/cache'

export interface DeleteReviewActionProps {
  quotationID: number
  id: number
}

export const deleteReview = async (payload: DeleteReviewActionProps) => {
  if (!payload) return

  await client.DELETE('/api/v1/customer/quotations/{quotationId}/review/{id}', {
    params: {
      path: {
        quotationId: payload.quotationID,
        id: payload.id,
      },
    },
  })

  revalidatePath(`/quotation/${payload.quotationID}`)
}
