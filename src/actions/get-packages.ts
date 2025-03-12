'use server'

import { client } from '@/api/client'

export interface Package {
  name: string
  packageDescription: string
  price: number
}

export const getPackages = async ({
  name,
  minPrice,
  maxPrice,
  categoryIds,
  page,
  pageSize,
}: {
  name?: string
  minPrice?: number
  maxPrice?: number
  categoryIds?: number[]
  page?: number
  pageSize?: number
}) => {
  const categoryIdsString = categoryIds?.join(',')

  const { data } = await client.GET('/api/v1/packages', {
    params: {
      query: {
        name: name,
        minPrice: minPrice,
        maxPrice: maxPrice,
        categoryIds: categoryIdsString,
        page: page,
        pageSize: pageSize,
      },
    },
  })
  return data
}
