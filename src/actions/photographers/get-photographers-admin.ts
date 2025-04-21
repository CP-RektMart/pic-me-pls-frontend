'use server'

import { client } from '@/api/client'

// import { PhotographerAdmin } from '@/types/photographer'

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

  return data?.data
}
