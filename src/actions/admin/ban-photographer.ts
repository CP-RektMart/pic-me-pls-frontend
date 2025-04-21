'use server'

import { client } from '@/api/client'

export default async function banPhotographer(photographerId: number) {
  await client.PATCH('/api/v1/admin/photographer/{id}/ban', {
    params: {
      path: {
        id: photographerId,
      },
    },
  })
}
