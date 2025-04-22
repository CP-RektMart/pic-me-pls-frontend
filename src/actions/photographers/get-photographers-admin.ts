'use server'

import { client } from '@/api/client'
import { Pagination } from '@/types'
import { PhotographerAdmin } from '@/types/photographer'

export const getPhotographerAdmin = async ({
  page,
  pageSize,
  name,
}: {
  page: number
  pageSize: number
  name?: string
}) => {
  const { data } = await client.GET('/api/v1/admin/photographers', {
    params: {
      query: {
        name: name,
        page: page,
        pageSize: pageSize,
      },
    },
  })

  const photographers: PhotographerAdmin[] =
    data?.data?.sort(
      (a: PhotographerAdmin, b: PhotographerAdmin) => (a.id ?? 0) - (b.id ?? 0)
    ) || []
  const res: Pagination<PhotographerAdmin> = {
    data: photographers,
    page: data?.page || 0,
    pageSize: data?.pageSize || 0,
    totalPage: data?.totalPage || 0,
  }
  return res
}
