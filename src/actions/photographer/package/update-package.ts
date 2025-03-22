'use server'

import { client } from '@/api/client'
import { uploadObject } from '@/api/upload-object'
import { Media } from '@/types/package'

import { EditPackageForm } from '@/components/photographer/packages/edit/edit-package'

export interface PhotoCards extends Media {
  image?: File
}
export interface EditPackageAction extends EditPackageForm {
  photoCards: PhotoCards[]
  deletePhotoIds: number[]
}

export async function updatePackage(payload: EditPackageAction) {
  //New Media
  await Promise.all(
    payload.photoCards.map(async (photoCard) => {
      if (photoCard.image) {
        const { url } = await uploadObject({
          file: photoCard.image,
          folder: 'PACKAGE',
        })

        await client.POST('/api/v1/photographer/media', {
          body: {
            pictureUrl: url,
            description: photoCard.description,
            packageId: payload.id,
          },
        })
      }
    })
  )

  console.log('Delete Photo Ids:', payload.deletePhotoIds)
  //Delete Media
  await Promise.all(
    payload.deletePhotoIds.map(async (photoCardId) => {
      if (photoCardId) {
        await client.DELETE('/api/v1/photographer/media/{mediaId}', {
          params: {
            path: {
              mediaId: photoCardId.toString(),
            },
          },
          body: {
            mediaID: photoCardId,
          },
        })
      }
    })
  )

  await client.PATCH('/api/v1/photographer/packages/{id}', {
    params: {
      path: {
        id: payload.id,
      },
    },
    body: {
      id: payload.id,
      name: payload.name,
      description: payload.packageDescription,
      price: payload.price,
      categoryId: parseInt(payload.category),
    },
  })
}
