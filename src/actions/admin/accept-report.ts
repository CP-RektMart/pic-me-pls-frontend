'use server'

import { client } from '@/api/client'

export async function acceptReport(reportId: number) {
  await client.PATCH('/api/v1/admin/reports/{reportID}/accept', {
    params: {
      path: {
        reportID: reportId,
      },
    },
  })
}
