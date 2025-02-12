import { z } from 'zod'

import { userResponseSchema, userRoleEnum } from './common'

export const registerRequest = z.object({
  idToken: z.string(),
  provider: z.string(),
  role: userRoleEnum,
})

export type RegisterRequest = z.infer<typeof registerRequest>

export const registerResponse = z.object({
  result: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    exp: z.number(),
    user: userResponseSchema,
  }),
})

export async function register(req: RegisterRequest) {
  const url = `${process.env.BACKEND_URL}/api/v1/auth/register`

  try {
    registerRequest.parse(req)
  } catch (err) {
    return { error: err }
  }

  try {
    const { idToken, provider, role } = req

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        provider: provider.toUpperCase(),
        idToken,
        role,
      }),
    })

    if (!response.ok) {
      return { error: 'Failed to register' }
    }

    const data = await response.json()
    const result = registerResponse.parse(data).result
    return result
  } catch (err) {
    return { error: err }
  }
}
