import { z } from 'zod'

export const userRoleEnum = z.enum(['CUSTOMER', 'PHOTOGRAPHER', 'ADMIN'])

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
    user: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
      phoneNumber: z.string(),
      profilePictureUrl: z.string(),
      role: userRoleEnum,
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      bank: z.string().optional(),
      accountNo: z.string().optional(),
      bankBranch: z.string().optional(),
    }),
  }),
})

export async function register(req: RegisterRequest) {
  try {
    registerRequest.parse(req)
  } catch (err) {
    return { error: err }
  }

  try {
    const url = `${process.env.BACKEND_URL}/api/v1/auth/register`

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

    console.log(response)

    if (!response.ok) {
      return { error: 'Failed to register' }
    }

    const data = await response.json()
    console.log('data', data)
    const result = registerResponse.parse(data).result
    return result
  } catch (err) {
    return { error: err }
  }
}
