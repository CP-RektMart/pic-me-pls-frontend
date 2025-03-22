'use server'

import { client } from '@/api/client'
import { uploadObject } from '@/api/upload-object'

import { CreatePackageForm } from '@/components/photographer/packages/create/create-package'

export interface CreatePackageAction extends CreatePackageForm {
  photoCards: {
    image: File
    description?: string
  }[]
}

export interface PhotoCard {
  image: File
  description?: string
}

export default async function CreatePackageAction(
  payload: CreatePackageAction
) {
  if (!payload.photoCards) {
    return
  }

  const photoCardObject = await Promise.all(
    payload.photoCards.map(async (photoCard) => {
      const { url } = await uploadObject({
        file: photoCard.image,
        folder: 'PACKAGE',
      })

      return {
        pictureUrl: url,
        description: photoCard.description,
      }
    })
  )
  console.log(photoCardObject)

  await client.POST('/api/v1/photographer/packages', {
    body: {
      name: payload.name,
      description: payload.packageDescription,
      media: photoCardObject,
      price: payload.price,
      categoryId: parseInt(payload.category),
    },
  })

  return
}
