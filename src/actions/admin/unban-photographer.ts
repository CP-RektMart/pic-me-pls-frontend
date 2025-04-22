'use server'

import { client } from '@/api/client'

export default async function unbanPhotographer(photographerId: number) {
  await client.PATCH('/api/v1/admin/photographer/{id}/unban', {
    params: {
      path: {
        id: photographerId,
      },
    },
  })
}
