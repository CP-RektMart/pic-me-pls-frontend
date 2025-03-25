import { client } from '@/api/client'
import ProfileMockImage from '@public/images/profile-mock-image.png'
import { redirect } from 'next/navigation'

import ProfileComponent from '@/components/profile'

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

  const { data: citizenCard } = await client.GET(
    '/api/v1/photographer/citizen-card'
  )

  return (
    <ProfileComponent
      isPhotographer={userProfile.role === 'PHOTOGRAPHER'}
      isPhotographerVerified={!!citizenCard}
      imageUrl={userProfile.profilePictureUrl || ProfileMockImage.src}
      name={userProfile.name || ''}
      email={userProfile.email || ''}
      phone={
        userProfile.phoneNumber
          ? userProfile.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
          : '-'
      }
      facebook={userProfile.facebook || '-'}
      instagram={userProfile.instagram || '-'}
      bank={userProfile.bank}
      accountNo={userProfile.accountNo}
      bankBranch={userProfile.bankBranch}
    />
  )
}
