import { client } from '@/api/client'

export async function getMessages() {
  const { response, data } = await client.GET('/api/v1/messages')
  if (response.status !== 200 || !data) {
    return null
  }

  return data.result
}
