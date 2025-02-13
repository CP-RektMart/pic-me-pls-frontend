import { auth } from '@/auth'
import { z } from 'zod'

import { citizenCardResponse } from './common'

export const reverifyCitizenCardRequest = z.object({
  cardPicture: z.instanceof(File),
  citizenId: z.string(),
  laserId: z.string(),
  expireDate: z.date(),
})

export type ReverifyCitizenCardRequest = z.infer<
  typeof reverifyCitizenCardRequest
>

export const reverifyCitizenCardResponse = z.object({
  result: citizenCardResponse,
})

export type ReverifyCitizenCardResponse = z.infer<
  typeof reverifyCitizenCardResponse
>

export async function reverifyCitizenCard(req: ReverifyCitizenCardRequest) {
  const session = await auth()
  const url = `${process.env.BACKEND_URL}/api/v1/photographer/reverify`

  try {
    reverifyCitizenCardRequest.parse(req)
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
      method: 'PATCH',
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
    return reverifyCitizenCardResponse.parse(data).result
  } catch {
    throw new Error('An error occurred while signing in')
  }
}
