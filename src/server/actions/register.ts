'use server'

import { auth } from '@/auth'
import { z } from 'zod'

export const registerRequest = z.object({
  idToken: z.string(),
  provider: z.string(),
  role: z.enum(['CUSTOMER', 'PHOTOGRAPHER', 'ADMIN']),
})

export type RegisterRequest = z.infer<typeof registerRequest>

export async function register(req: RegisterRequest) {
  try {
    const url = `${process.env.BACKEND_URL}/api/v1/auth/register`
    const session = await auth()

    if (!session) {
      return { error: 'No session found' }
    }

    const access_token = session.accessToken
    const { idToken, provider, role } = req

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        idToken,
        provider,
        role,
      }),
    })

    if (!response.ok) {
      return { error: 'Failed to register' }
    }

    return { success: true }
  } catch (err) {
    return { error: err }
  }
}
