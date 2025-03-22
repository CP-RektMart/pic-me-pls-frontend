import { client } from '@/api/client'
import { Photographer } from '@/types/photographer'

export const getPhotographer = async (id: number) => {
  const { data, response } = await client.GET('/api/v1/photographers/{id}', {
    params: { path: { id } },
  })

  if (!response.ok || !data || !data.result) {
    return null
  }

  const res: Photographer = data.result
  return res
}
