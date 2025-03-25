'use server'

import { client } from '@/api/client'
import { PreviewList } from '@/types/quotation'

export async function getPreviewById(
  quotationId: number
): Promise<PreviewList> {
  const { response, data } = await client.GET('/api/v1/quotations/{id}', {
    params: { path: { id: quotationId } },
  })
  if (!response.ok || !data?.result) {
    return []
  }
  return data?.result?.previews
}
