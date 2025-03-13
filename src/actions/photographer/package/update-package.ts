'use server'

import { client } from '@/api/client'

import { EditPackageForm } from '@/components/photographer/packages/edit/edit-package'

export async function updatePackage(payload: EditPackageForm) {
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
