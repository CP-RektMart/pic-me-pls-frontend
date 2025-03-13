'use server'

import { client } from '@/api/client'
import { uploadObject } from '@/api/upload-object'

export interface ReverifyCitizenCardAction {
  citizenId?: string
  image?: File
  laserId?: string
  expireDate?: Date
}

export default async function reverifyCitizenCardAction(
  payload: ReverifyCitizenCardAction
) {
  let imageUrl: string | undefined = undefined
  if (payload.image) {
    const { url } = await uploadObject({
      file: payload.image,
      folder: 'VERIFY_CITIZENCARD',
    })
    imageUrl = url
  }

  await client.PATCH('/api/v1/photographer/citizen-card/reverify', {
    body: {
      imageUrl: imageUrl,
      citizenId: payload.citizenId,
      laserId: payload.laserId,
      expireDate: payload.expireDate?.toISOString(),
    },
  })
}
