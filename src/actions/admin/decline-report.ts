'use server'

import { client } from '@/api/client'

export async function declineReport(reportId: number) {
  await client.PATCH('/api/v1/admin/reports/{reportID}/decline', {
    params: {
      path: {
        reportID: reportId,
      },
    },
  })
}
