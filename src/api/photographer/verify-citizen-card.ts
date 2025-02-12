import { z } from 'zod'

import { citizenCardResponse } from './common'

export const verifyCitizenCardRequest = z.object({
  accessToken: z.string(),
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
  const url = `${process.env.BACKEND_URL}/api/v1/photographer/verify`

  try {
    verifyCitizenCardRequest.parse(req)
  } catch (err) {
    return { error: err }
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
        Authorization: `Bearer ${req.accessToken}`,
      },
      body: formDataBody,
    })

    if (!response.ok) {
      return { error: response.statusText }
    }

    const data = await response.json()
    return verifyCitizenCardResponse.parse(data).result
  } catch (error) {
    console.error('Error during sign in:', error)
    return { error: 'An error occurred while signing in' }
  }
}
