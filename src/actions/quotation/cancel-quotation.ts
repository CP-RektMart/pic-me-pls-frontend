'use server'

import { client } from '@/api/client'
import { revalidatePath } from 'next/cache'

export default async function cancelQuotation(id: number) {
  await client.PATCH('/api/v1/customer/quotations/{id}/cancel', {
    params: { path: { id } },
  })

  revalidatePath(`/quotations/${id}`)
}
