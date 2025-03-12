'use client'

import { mockPackages } from '@/data/packagecards'
import { mockPhotographer } from '@/data/photographer'
import { useParams } from 'next/navigation'

import ProfileHeader from '@/components/customer-quotation/profile-header'
import PackageGrid from '@/components/home-page/package-grid'
import SearchInput from '@/components/home-page/search-input'

export default function Page() {
  // TODO: Get real photographer data

  const params = useParams()
  const photographerId = params?.id ?? 'unknown'
  const profile = mockPhotographer

  const packageNums = mockPackages.length || 0
  const imageUrl = profile.profilePictureUrl || '/image.png'
  const userName = profile.name || 'Default Name'

  console.log(profile.profilePictureUrl)
  console.log(photographerId)

  return (
    <div className='max-w-screen flex w-full flex-col px-4 pt-4 md:px-32'>
      <div className='flex w-full flex-col gap-4 md:flex-row md:items-center'>
        <ProfileHeader
          imageUrl={imageUrl}
          name={userName}
          packageNumber={packageNums}
        />
      </div>
      <div className='mt-6'>
        <SearchInput searchType='Package' />
      </div>
      <div className='my-6'>
        <PackageGrid packagecards={mockPackages} />
      </div>
    </div>
  )
}
