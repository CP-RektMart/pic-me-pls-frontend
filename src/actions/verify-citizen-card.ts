'use server'

import { client } from '@/api/client'
import { uploadObject } from '@/api/upload-object'

export interface VerifyCitizenCardAction {
  citizenId: string
  image: File
  laserId: string
  expireDate: Date
}

export default async function verifyCitizenCardAction(
  payload: VerifyCitizenCardAction
) {
  const { url } = await uploadObject({
    file: payload.image,
    folder: 'VERIFY_CITIZENCARD',
  })

  await client.POST('/api/v1/photographer/citizen-card/verify', {
    body: {
      imageUrl: url,
      citizenId: payload.citizenId,
      laserId: payload.laserId,
      expireDate: payload.expireDate.toISOString(),
    },
  })

  return
}
