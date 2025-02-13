import { auth } from '@/auth'
import { z } from 'zod'

import { citizenCardResponse } from './common'

export const verifyCitizenCardRequest = z.object({
  cardPicture: z.instanceof(File),
  citizenId: z.string(),
  laserId: z.string(),
  expireDate: z.date(),
})

export type VerifyCitizenCardRequest = z.infer<typeof verifyCitizenCardRequest>

export const verifyCitizenCardResponse = z.object({
  result: citizenCardResponse,
})

export type VerifyCitizenCardResponse = z.infer<
  typeof verifyCitizenCardResponse
>

export async function verifyCitizenCard(req: VerifyCitizenCardRequest) {
  const session = await auth()
  const url = `${process.env.BACKEND_URL}/api/v1/photographer/verify`

  try {
    verifyCitizenCardRequest.parse(req)
  } catch {
    throw new Error('INVALID_REQUEST')
  }

  try {
    const formDataBody = new FormData()
    formDataBody.append('citizenId', req.citizenId)
    formDataBody.append('laserId', req.laserId)
    formDataBody.append('expireDate', req.expireDate.toISOString())
    formDataBody.append('cardPicture', req.cardPicture)

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
      body: formDataBody,
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error)
    }

    const data = await response.json()
    return verifyCitizenCardResponse.parse(data).result
  } catch {
    throw new Error('An error occurred while signing in')
  }
}
