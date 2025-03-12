'use server'

import { client } from '@/api/client'
import { components } from '@/api/schema'

export default async function getCategoriesAction() {
  const { response, data } = await client.GET('/api/v1/categories')

  if (response.status !== 200) {
    return
  }

  if (!data || !data.result || !data.result.data) {
    return
  }

  const categories: components['schemas']['dto.CategoryResponse'][] =
    data.result.data

  return categories
}
