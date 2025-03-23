import { client } from '@/api/client'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

import ReverifyPhotographer from '@/components/photographer/citizencard/reverify'

export default async function Page() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  // Guard if the user has not verified
  const { data, response } = await client.GET(
    '/api/v1/photographer/citizen-card'
  )
  if (response.status === 404) {
    redirect('/photographer/verify')
  }

  if (!response.ok) {
    redirect('/login')
  }

  let citizenId = data?.result?.citizenId || ''
  if (citizenId !== '') {
    citizenId = `${citizenId[0]}-${citizenId.slice(1, 5)}-${citizenId.slice(5, 10)}-${citizenId.slice(10, 12)}-${citizenId.slice(12)}`
  }

  let laserId = data?.result?.laserId || ''
  if (laserId !== '') {
    laserId = `${laserId.slice(0, 3)}-${laserId.slice(3, 9)}-${laserId.slice(9, 11)}`
  }

  return (
    <ReverifyPhotographer
      citizenId={citizenId}
      laserId={laserId}
      picture={data?.result?.picture || ''}
      expireDate={
        data?.result?.expireDate
          ? new Date(data?.result?.expireDate)
          : new Date()
      }
    />
  )
}
