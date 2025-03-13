'use server'

import { client } from '@/api/client'
import { Pagination } from '@/types'
import { PackageVerbose } from '@/types/package'

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

  const packages: PackageVerbose[] =
    data?.data?.sort(
      (a: PackageVerbose, b: PackageVerbose) => (a.id ?? 0) - (b.id ?? 0)
    ) || []
  const res: Pagination<PackageVerbose> = {
    data: packages,
    page: data?.page || 0,
    pageSize: data?.pageSize || 0,
    totalPage: data?.totalPage || 0,
  }
  return res
}
