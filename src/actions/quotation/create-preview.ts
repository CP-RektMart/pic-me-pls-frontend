'use server'

import { client } from '@/api/client'

interface AddPreviewAction {
  quotationId: number
  link: string
}

export async function createPreview({ quotationId, link }: AddPreviewAction) {
  await client.POST('/api/v1/photographer/quotations/{id}/preview', {
    params: { path: { id: quotationId } },
    body: {
      quotationId: quotationId,
      link: link,
    },
  })
}
