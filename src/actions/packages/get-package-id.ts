'use server'

import { client } from '@/api/client'
import { PackageVerbose } from '@/types/package'

export const getPackage = async (id: string) => {
  const { data, response } = await client.GET('/api/v1/packages/{id}', {
    params: { path: { id } },
  })

  if (!response.ok || !data || !data.result) {
    return null
  }

  return data as PackageVerbose
}
