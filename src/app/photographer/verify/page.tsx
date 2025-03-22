import { client } from '@/api/client'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

import VerifyPhotographer from '@/components/photographer/citizencard/verify'

export default async function Page() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  // Guard if the user has already verified
  const { response } = await client.GET('/api/v1/photographer/citizen-card')
  if (response.status !== 404) {
    redirect('/photographer/reverify')
  }

  return <VerifyPhotographer />
}
