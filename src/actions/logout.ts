'use server'

import { client } from '@/api/client'

export async function logout() {
  const { response } = await client.POST('/api/v1/auth/logout')

  if (!response.ok) {
    return { error: 'Failed to logout' }
  }
}
