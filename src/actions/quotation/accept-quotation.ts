'use server'

import { client } from '@/api/client'
import { revalidatePath } from 'next/cache'

export default async function acceptQuotation(id: number) {
  await client.PATCH('/api/v1/customer/quotations/{id}/accept', {
    params: { path: { id } },
  })

  revalidatePath(`/quotations/${id}`)
}
