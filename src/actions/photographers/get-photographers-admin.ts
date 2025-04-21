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
    (data?.data as PhotographerAdmin[]) || []
  const res: Pagination<PhotographerAdmin> = {
    data: photographers,
    page: data?.result?.page || 0,
    pageSize: data?.result?.pageSize || 0,
    totalPage: data?.result?.totalPage || 0,
  }
  return res
}
