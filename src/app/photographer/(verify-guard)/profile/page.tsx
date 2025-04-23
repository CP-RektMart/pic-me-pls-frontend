import { client } from '@/api/client'
import { redirect } from 'next/navigation'

import { Profile } from '@/components/photographer/profile'

export default async function Page() {
  const { response: profileResponse, data: profile } =
    await client.GET('/api/v1/me')

  if (profileResponse.status !== 200) {
    redirect('/login')
  }

  if (!profile || !profile.result) {
    return <div></div>
  }

  const { data: citizenCard } = await client.GET(
    '/api/v1/photographer/citizen-card'
  )

  return <Profile profile={profile.result} citizenCard={citizenCard?.result} />
}
