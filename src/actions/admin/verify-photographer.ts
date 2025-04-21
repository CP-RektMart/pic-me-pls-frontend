'use server'

import { client } from '@/api/client'
import { revalidatePath } from 'next/cache'

export default async function verifyPhotographer(id: number) {
  console.log('verify called')

  await client.PATCH('/api/v1/admin/photographers/{photographerID}/verify', {
    params: {
      path: { id },
    },
  })

  revalidatePath(`/photographers/${id}`)
}
