'use server'

import { client } from '@/api/client'

export default async function deletePackage(packageId: number) {
  await client.DELETE('/api/v1/admin/packages/{packageID}', {
    params: {
      path: {
        packageID: packageId,
      },
    },
  })
}
