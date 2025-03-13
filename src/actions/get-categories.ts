import { client } from '@/api/client'
import { Pagination } from '@/types'
import { Category } from '@/types/category'

export const getCategories = async () => {
  const { data } = await client.GET('/api/v1/categories')

  const categories: Category[] = data?.result?.data || []
  const res: Pagination<Category> = {
    data: categories,
    page: data?.result?.page || 0,
    pageSize: data?.result?.pageSize || 0,
    totalPage: data?.result?.totalPage || 0,
  }
  return res
}
