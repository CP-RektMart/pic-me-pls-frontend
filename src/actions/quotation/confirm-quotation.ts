'use server'

import { client } from '@/api/client'
import { revalidatePath } from 'next/cache'

export default async function confirmQuotation(id: number) {
  await client.PATCH('/api/v1/customer/quotations/{id}/confirm', {
    params: { path: { id } },
  })

  revalidatePath(`/quotations/${id}`)
}
