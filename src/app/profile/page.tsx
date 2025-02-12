import getProfile from '@/server/actions/get-profile'

import ProfileComponent from '@/components/profile-page'

export default async function ProfilePage() {
  const response = await getProfile()

  if (!response || !response.result) {
    return <div>Failed to get user profile</div>
  }

  const userProfile = response.result

  return (
    <ProfileComponent
      isPhotographer={userProfile.role == 'PHOTOGRAPHER'}
      name={userProfile.name || 'John Doe'}
      email={userProfile.email || 'user@picmepls.com'}
      phone={
        userProfile.phone_number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3') ||
        '0xx-xxx-xxxx'
      }
      facebook={userProfile.facebook || 'Facebook'}
      instagram={userProfile.instagram || 'Instagram'}
      bank={userProfile.bank}
      accountNo={userProfile.account_no}
      bankBranch={userProfile.bank_branch}
    />
  )
}
