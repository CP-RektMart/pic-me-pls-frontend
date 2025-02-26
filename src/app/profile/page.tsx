import { client } from '@/api/client'
import { redirect } from 'next/navigation'

import ProfileComponent from '@/components/profile-page'

export default async function ProfilePage() {
  const { response, data: profile } = await client.GET('/api/v1/me')

  if (response.status !== 200) {
    redirect('/login')
  }

  if (!profile || !profile.result) {
    return <div></div>
  }

  const userProfile = profile.result

  return (
    <ProfileComponent
      isPhotographer={userProfile.role == 'PHOTOGRAPHER'}
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
