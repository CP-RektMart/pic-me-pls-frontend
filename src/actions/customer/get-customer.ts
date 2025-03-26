'use server'

import { client } from '@/api/client'
import { CustomerPublic } from '@/types/user'

export async function getCustomer(
  id: number
): Promise<CustomerPublic | undefined> {
  const { response, data } = await client.GET('/api/v1/customers/{id}', {
    params: { path: { id: id } },
  })

  if (!response.ok || !data?.result) {
    return undefined
  }

  return data.result
}
