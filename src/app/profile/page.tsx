import { auth } from '@/auth'
import { redirect } from 'next/navigation'

import ProfileComponent from '@/components/profile-page'

export default async function ProfilePage() {
  const session = await auth()

  if (!session) {
    redirect(`/login`)
  }

  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
  })

  if (!response.ok) {
    redirect(`/login`)
  }

  const userProfile = (await response.json()).result

  return (
    <ProfileComponent
      isPhotographer={userProfile.role == 'PHOTOGRAPHER'}
      imageUrl={userProfile.profilePictureUrl || '/image.png'}
      name={userProfile.name}
      email={userProfile.email}
      phone={
        userProfile.phoneNumber
          ? userProfile.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
          : '012-345-6789'
      }
      facebook={userProfile.facebook || 'Facebook'}
      instagram={userProfile.instagram || 'Instagram'}
      bank={userProfile.bank}
      accountNo={userProfile.accountNo}
      bankBranch={userProfile.bankBranch}
    />
  )
}
