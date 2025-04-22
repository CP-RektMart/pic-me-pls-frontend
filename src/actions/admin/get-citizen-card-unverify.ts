'use server'

import { client } from '@/api/client'
import { components } from '@/api/schema'
import { Pagination } from '@/types'

export type UnverifiedPhotographer =
  components['schemas']['dto.ListUnverifiedPhotographerResponse']

export default async function getUnverifiedCitizenCards({
  page,
  pageSize,
  name,
}: {
  page?: number
  pageSize?: number
  name?: string
}): Promise<Pagination<UnverifiedPhotographer>> {
  const { data } = await client.GET('/api/v1/admin/citizenCards/unverify', {
    params: {
      query: {
        page,
        pageSize,
        name,
      },
    },
  })

  const photographers: UnverifiedPhotographer[] =
    data?.data?.sort((a, b) => (a.id ?? 0) - (b.id ?? 0)) || []

  const res: Pagination<UnverifiedPhotographer> = {
    data: photographers,
    page: data?.page || 0,
    pageSize: data?.pageSize || 0,
    totalPage: data?.totalPage || 0,
  }

  return res
}
