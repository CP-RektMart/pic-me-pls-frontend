import { client } from '@/api/client'

export const getCategories = async () => {
  const { data: categories } = await client.GET('/api/v1/categories')
  return categories
}
