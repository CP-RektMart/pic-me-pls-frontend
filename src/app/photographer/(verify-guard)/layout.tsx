import { getMyCitizenCard } from '@/actions/citizen-card/get-my-citizencard'
import { redirect } from 'next/navigation'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const citizenCard = await getMyCitizenCard()

  if (!citizenCard) {
    redirect('/photographer/verify')
  }

  return <>{children}</>
}
