'use server'

import { client } from '@/api/client'

export interface Package {
  name: string
  packageDescription: string
  price: number
}

export const getPhotographerPackages = async ({
  photographerId,
  name,
  page,
  pageSize,
}: {
  photographerId: number
  name?: string
  page?: number
  pageSize?: number
}) => {
  const { data } = await client.GET('/api/v1/packages', {
    params: {
      query: {
        photographerId: photographerId,
        name: name,
        page: page,
        pageSize: pageSize,
      },
    },
  })
  return data
}
