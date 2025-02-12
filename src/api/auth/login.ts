import { z } from 'zod'

import { userResponseSchema } from './common'

export const loginRequest = z.object({
  idToken: z.string(),
  provider: z.string(),
})

export type LoginRequest = z.infer<typeof loginRequest>

export const loginResponse = z.object({
  result: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    exp: z.number(),
    user: userResponseSchema,
  }),
})

export async function login(req: LoginRequest) {
  const url = `${process.env.BACKEND_URL}/api/v1/auth/login`

  try {
    loginRequest.parse(req)
  } catch (err) {
    return { error: err }
  }

  try {
    const { idToken, provider } = req

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        provider: provider.toUpperCase(),
        idToken,
      }),
    })

    if (!response.ok) {
      return { error: response.statusText }
    }

    const data = await response.json()
    return loginResponse.parse(data).result
  } catch (error) {
    console.error('Error during sign in:', error)
    return { error: 'An error occurred while signing in' }
  }
}
