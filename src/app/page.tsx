import { auth } from '@/auth'

import HomePageComponent from '@/components/home-page'

export default async function Home() {
  const session = await auth()
  let userProfile = null

  if (session) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
    userProfile = (await response.json()).result
  }

  return <HomePageComponent userProfile={userProfile} />
}
