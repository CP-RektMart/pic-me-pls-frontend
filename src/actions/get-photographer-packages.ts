'use server'

import { client } from '@/api/client'

export interface Package {
  name: string
  packageDescription: string
  price: number
}

export const getPhotograhperPackages = async ({
  photographerId,
}: {
  photographerId: number
}) => {
  const { data } = await client.GET('/api/v1/packages', {
    params: {
      query: {
        photographerId: photographerId,
      },
    },
  })
  return data
}
