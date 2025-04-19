'use server'

import { client } from '@/api/client'
import { Pagination } from '@/types'
import { PublicUser } from '@/types/user'

export interface getAllUsersProps {
  name: string
  page: number
  pageSize: number
}

export const getAllUsers = async ({
  name,
  page,
  pageSize,
}: getAllUsersProps) => {
  const { data } = await client.GET('/api/v1/admin/users', {
    params: {
      query: {
        name: name,
        page: page,
        pageSize: pageSize,
      },
    },
  })

  const publicUsers: PublicUser[] =
    data?.data?.sort(
      (a: PublicUser, b: PublicUser) => (a.id ?? 0) - (b.id ?? 0)
    ) || []
  const res: Pagination<PublicUser> = {
    data: publicUsers,
    page: data?.page || 0,
    pageSize: data?.pageSize || 0,
    totalPage: data?.totalPage || 0,
  }

  return res
}
