import { client } from '@/api/client'

import HomePageComponent from '@/components/home-page'

export default async function Home() {
  const { data: profile } = await client.GET('/api/v1/me')

  if (!profile || !profile.result) {
    return <HomePageComponent userProfile={undefined} />
  }
  const userProfile = profile.result

  return <HomePageComponent userProfile={userProfile} />
}
