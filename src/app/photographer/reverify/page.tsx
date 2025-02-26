import { client } from '@/api/client'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

import ReverifyPhotographer from '@/components/photographer/reverify-photographer'

export default async function Page() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  const { data, response } = await client.GET(
    '/api/v1/photographer/citizen-card'
  )

  if (response.status === 404) {
    redirect('/photographer/verify')
  }

  if (!response.ok) {
    redirect('/login')
  }

  return (
    <ReverifyPhotographer
      citizenId={data?.result?.citizenId || ''}
      laserId={data?.result?.laserId || ''}
      picture={data?.result?.picture || ''}
      expireDate={
        data?.result?.expireDate
          ? new Date(data?.result?.expireDate)
          : new Date()
      }
    />
  )
}
