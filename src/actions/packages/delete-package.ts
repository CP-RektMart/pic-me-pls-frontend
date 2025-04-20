'use server'

import { client } from '@/api/client'

export default async function deletePackage(packageId: number) {
  await client.DELETE('/api/v1/photographer/packages/{id}', {
    params: {
      path: {
        id: packageId,
      },
    },
  })
}
