import { client } from '@/api/client'
import { components } from '@/api/schema'

export interface Package {
  id: number
  name: string
  packageDescription: string
  price: number
}

export async function getPackages(): Promise<Package[]> {
  const { data: packages } = await client.GET('/api/v1/photographer/packages')

  if (!packages || !packages.result) {
    return []
  }

  return (
    packages.result.map(
      (q: components['schemas']['dto.PackageResponse']): Package => ({
        id: q.id || 0,
        name: q.name || '',
        packageDescription: q.description || '',
        price: q.price || 0,
      })
    ) || []
  )
}
