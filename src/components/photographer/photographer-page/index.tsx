'use client'

import { useState } from 'react'

import { getPhotograhperPackages } from '@/actions/get-photographer-packages'
import { Package } from '@/types/package'

import ProfileHeader from '@/components/customer-quotation/profile-header'
import PackageGrid from '@/components/home-page/package-grid'
import SearchInput from '@/components/photographer/photographer-page/search-input'

interface PhotographerProfileProps {
  imageUrl: string
  name: string
  packageNumber: number
  photographerId: number
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
  initialPhotographerPackages,
}: {
  photographerProfile: PhotographerProfileProps
  initialPhotographerPackages: PackageProps[]
}) {
  const [packages, setPackages] = useState<PackageProps[]>(
    initialPhotographerPackages
  )
  const [searchText, setSearchText] = useState('')

  const onSearchClick = async () => {
    console.log('searching for:', searchText)
    const packagesResponse = await getPhotograhperPackages({
      photographerId: photographerProfile.photographerId,
      name: searchText,
    })
    const packagesData = packagesResponse?.data ?? []
    const searchPackages = packagesData.map((pkg: Package) => ({
      title: pkg.name ?? 'Unknown title',
      photographer: pkg.photographer?.name ?? 'Annonymous',
      category: pkg.category?.name ?? 'Unknown category',
      price: pkg.price ? `${pkg.price}` : 'Price not available',
      imageUrl: pkg.media?.[0]?.pictureUrl ?? '/profile-mock-image.png',
    }))
    setPackages(searchPackages)
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
        <SearchInput
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearchClick={onSearchClick}
        />
      </div>
      <div className='my-6'>
        <PackageGrid packagecards={packages} />
      </div>
    </div>
  )
}
