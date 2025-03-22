'use server'

import { client } from '@/api/client'
import { uploadObject } from '@/api/upload-object'

interface UpdateProfileAction {
  image?: File
  name: string
  phone: string
  facebook?: string
  instagram?: string
  bank?: string
  accountNo?: string
  bankBranch?: string
}

export default async function updateProfileAction(
  payload: UpdateProfileAction
) {
  let imageUrl: string | undefined = undefined
  if (payload.image) {
    const { url } = await uploadObject({
      file: payload.image,
      folder: 'PROFILE_IMAGE',
    })
    imageUrl = url
  }

  await client.PATCH('/api/v1/me', {
    body: {
      profilePictureUrl: imageUrl,
      name: payload.name,
      phoneNumber: payload.phone.replaceAll('-', ''),
      facebook: payload.facebook,
      instagram: payload.instagram,
      bank: payload.bank,
      accountNo: payload.accountNo,
      bankBranch: payload.bankBranch,
    },
  })
}
