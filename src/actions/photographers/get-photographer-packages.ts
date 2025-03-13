'use server'

import { client } from '@/api/client'
import { Pagination } from '@/types'
import { PackageVerbose } from '@/types/package'

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

  const packages: PackageVerbose[] = data?.data || []
  const res: Pagination<PackageVerbose> = {
    data: packages,
    page: data?.page || 0,
    pageSize: data?.pageSize || 0,
    totalPage: data?.totalPage || 0,
  }
  return res
}
