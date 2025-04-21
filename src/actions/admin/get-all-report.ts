'use server'

import { client } from '@/api/client'
import { Pagination } from '@/types'
import { Report } from '@/types/report'

export interface getAllReportsProps {
  title: string
  page: number
  pageSize: number
}

export const getAllReports = async ({
  title,
  page,
  pageSize,
}: getAllReportsProps) => {
  const { data } = await client.GET('/api/v1/admin/reports', {
    params: {
      query: {
        title: title,
        page: page,
        pageSize: pageSize,
      },
    },
  })

  const reports: Report[] =
    data?.data?.sort((a: Report, b: Report) => (a.id ?? 0) - (b.id ?? 0)) || []

  const res: Pagination<Report> = {
    data: reports,
    page: data?.page || 0,
    pageSize: data?.pageSize || 0,
    totalPage: data?.totalPage || 0,
  }

  return res
}
