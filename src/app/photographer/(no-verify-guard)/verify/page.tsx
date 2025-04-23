import { getMyCitizenCard } from '@/actions/citizen-card/get-my-citizencard'
import { redirect } from 'next/navigation'

import VerifyPhotographer from '@/components/photographer/citizencard/verify'

export default async function Page() {
  const citizenCard = await getMyCitizenCard()
  if (citizenCard) {
    redirect('/photographer/reverify')
  }

  return <VerifyPhotographer />
}
