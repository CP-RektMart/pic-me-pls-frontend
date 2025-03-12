import { components } from '@/api/schema'

export interface CategoryInterface {
  id: string
  name: string
}

export type Category = components['schemas']['dto.CategoryResponse']
