'use client'

import { mockPackages } from '@/data/packagecards'
import { mockUser } from '@/data/user'
import { User } from '@/types/user'
import { useParams } from 'next/navigation'

import Greeting from '@/components/home-page/greeting'
import PackageGrid from '@/components/home-page/package-grid'

export default function HomePageComponent({
  userProfile,
}: {
  userProfile?: User
}) {
  const params = useParams()
  const photographerId = params.id
  console.log(photographerId)

  userProfile = mockUser

  console.log(userProfile.profilePictureUrl)

  return (
    <div className='max-w-screen flex w-full flex-col px-4 pt-4 md:px-32'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center'>
        <Greeting
          userName={userProfile?.name}
          userProfilePictureUrl={userProfile?.profilePictureUrl}
        />
      </div>
      <div className='my-6'>
        <PackageGrid packagecards={mockPackages} />
      </div>
    </div>
  )
}
