'use client'

import ProfileHeader from '@/components/customer-quotation/profile-header'
import PackageGrid from '@/components/home-page/package-grid'
import SearchInput from '@/components/photographer/photographer-page/search-input'

interface PhotographerProfileProps {
  imageUrl: string
  name: string
  packageNumber: number
}

interface PackageProps {
  title: string
  photographer: string
  price: string
  category: string
  imageUrl: string
  alt?: string
  onClick?: () => void
}

export default function PhotographerPage({
  photographerProfile,
  photographerPackages,
}: {
  photographerProfile: PhotographerProfileProps
  photographerPackages: PackageProps[]
}) {
  const onSearchClick = async () => {
    // const packagesResponse = await getPhotograhperPackages({
    //   photographerId: 1,
    // })
    // const packagesData = packagesResponse?.data ?? []
    // const photographer = packagesData[0]?.photographer
    // if (!photographer) {
    //   return
    // }
    // const profileProps: PhotographerProfileProps = {
    //   imageUrl: photographer.profilePictureUrl ?? '/image.png',
    //   name: photographer.name ?? 'Anonymous',
    //   packageNumber: packagesData.length,
    // }
    // console.log(profileProps)
    // setProfileProps(profileProps)
  }

  return (
    <div className='max-w-screen flex w-full flex-col px-4 pt-4 md:px-32'>
      <div className='flex w-full flex-col gap-4 md:flex-row md:items-center'>
        <ProfileHeader
          imageUrl={photographerProfile.imageUrl}
          name={photographerProfile.name}
          packageNumber={photographerProfile.packageNumber}
        />
      </div>
      <div className='mt-6'>
        <SearchInput onSearchClick={onSearchClick} />
      </div>
      <div className='my-6'>
        <PackageGrid packagecards={photographerPackages} />
      </div>
    </div>
  )
}
