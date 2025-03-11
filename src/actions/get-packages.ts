import { client } from '@/api/client'

export interface Package {
  id: number
  name: string
  packageDescription: string
  price: number
}

export async function getPackages(): Promise<Package[]> {
  const { data: packages } = await client.GET('/api/v1/photographer/packages')

  // Ensure the result exists and is properly mapped
  return (
    packages?.result?.map(
      (q: {
        description?: string
        id?: number
        name?: string
        price?: number
      }): Package => ({
        id: q.id ?? 0,
        name: q.name ?? '',
        packageDescription: q.description ?? '',
        price: q.price ?? 0,
      })
    ) || []
  )
}
