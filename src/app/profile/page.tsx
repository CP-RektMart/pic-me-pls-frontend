import { client } from '@/api/client'
import { redirect } from 'next/navigation'

import ProfileComponent from '@/components/profile-page'

export default async function ProfilePage() {
  const { response: profileResponse, data: profile } =
    await client.GET('/api/v1/me')

  if (profileResponse.status !== 200) {
    redirect('/login')
  }

  if (!profile || !profile.result) {
    return <div></div>
  }

  const userProfile = profile.result

  let isPhotographerVerified = false
  if (userProfile.role === 'PHOTOGRAPHER') {
    const { response: citizenCardResponse, data: citizenCard } =
      await client.GET('/api/v1/photographer/citizen-card')

    if (citizenCardResponse.ok && !citizenCard?.result) {
      isPhotographerVerified = true
    }
  }

  return (
    <ProfileComponent
      isPhotographer={userProfile.role === 'PHOTOGRAPHER'}
      isPhotographerVerified={isPhotographerVerified}
      imageUrl={userProfile.profilePictureUrl || '/image.png'}
      name={userProfile.name || ''}
      email={userProfile.email || ''}
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
