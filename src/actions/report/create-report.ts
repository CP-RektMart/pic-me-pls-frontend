'use server'

import { client } from '@/api/client'
import { revalidatePath } from 'next/cache'

export interface CreateReportPayload {
  title: string
  description: string
  quotationId: number
}

export async function createReport(payload: CreateReportPayload) {
  await client.POST('/api/v1/customer/reports', {
    body: {
      message: payload.description,
      title: payload.title,
      quotationId: payload.quotationId,
    },
  })

  revalidatePath(`/reports`)

  return
}
