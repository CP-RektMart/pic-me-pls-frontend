'use server'

import { client } from '@/api/client'

export default async function setUserRole(id: number, isAdmin: boolean) {
  await client.PATCH('/api/v1/admin/users/{userID}/role', {
    params: {
      path: { userID: id },
    },
    body: {
      admin: !isAdmin,
      userID: id,
    },
  })
}
