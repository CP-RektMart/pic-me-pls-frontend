import { auth } from '@/auth'
import { redirect } from 'next/navigation'

import ReverifyPhotographer from '@/components/reverify-photographer'

export default async function Page() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/photographer/citizen-card`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  )

  if (!response.ok) {
    redirect('/login')
  }

  const citizenCardInfo = (await response.json()).result
  return (
    <ReverifyPhotographer
      citizenId={citizenCardInfo.citizenId}
      laserId={citizenCardInfo.laserId}
      picture={citizenCardInfo.picture}
      expireDate={new Date(citizenCardInfo.expireDate)}
    />
  )
}
