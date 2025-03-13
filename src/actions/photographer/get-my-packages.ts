import { client } from '@/api/client'

export const getMyPackages = async () => {
  const { data } = await client.GET('/api/v1/photographer/packages')

  if (!data || !data.result) {
    return []
  }

  return data.result
}
