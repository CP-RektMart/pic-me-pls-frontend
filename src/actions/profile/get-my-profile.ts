import { client } from '@/api/client'
import { User } from '@/types/user'

export const getMyProfile = async () => {
  const { data } = await client.GET('/api/v1/me')

  const res: User = data?.result || {}
  return res
}
