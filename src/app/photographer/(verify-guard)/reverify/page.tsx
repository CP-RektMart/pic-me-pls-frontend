import { client } from '@/api/client'
import { redirect } from 'next/navigation'

import ReverifyPhotographer from '@/components/photographer/citizencard/reverify'

export default async function Page() {
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

  const citizenId =
    data?.result?.citizenId?.replace(
      /(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/,
      '$1-$2-$3-$4-$5'
    ) || ''

  const laserId =
    data?.result?.laserId?.replace(/(\w{3})(\d{6})(\d{2})/, '$1-$2-$3') || ''

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
