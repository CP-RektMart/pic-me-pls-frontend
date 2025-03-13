'use client'

import { useState } from 'react'

import { getPhotograhperPackages } from '@/actions/photographers/get-photographer-packages'
import { Pagination } from '@/types'
import { PackageVerbose } from '@/types/package'
import { Photographer } from '@/types/photographer'
import { Icon } from '@iconify/react/dist/iconify.js'
import MockPhotoCard from '@public/images/mock-photo-card.jpg'
import ProfileMockImage from '@public/images/profile-mock-image.png'

import ProfileHeader from '@/components/customer-quotation/profile-header'
import PackageCard from '@/components/home-page/package-card'
import SearchInput from '@/components/photographers/photographer/search-input'

interface PhotographerPageProps {
  photographer: Photographer
  packagesWithPagination: Pagination<PackageVerbose>
}

export default function PhotographerPage(props: PhotographerPageProps) {
  const { photographer, packagesWithPagination } = props

  const [packages, setPackages] = useState<PackageVerbose[]>(
    packagesWithPagination.data
  )

  const [searchText, setSearchText] = useState('')

  const onSearchClick = async () => {
    if (!photographer.id) return

    const searchedPackages = await getPhotograhperPackages({
      photographerId: photographer.id,
    })

    setPackages(searchedPackages.data)
  }

  return (
    <div className='max-w-screen flex w-full flex-col px-4 pt-4 md:px-32'>
      <div className='flex w-full flex-col gap-4 md:flex-row md:items-center'>
        <ProfileHeader
          imageUrl={photographer.profilePictureUrl || ProfileMockImage.src}
          name={photographer.name || ''}
          packageNumber={packagesWithPagination.data.length}
        />
      </div>
      <div className='mt-6'>
        <SearchInput
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearchClick={onSearchClick}
        />
      </div>
      {packages.length === 0 ? (
        <div className='flex min-h-[50vh] flex-col items-center justify-center gap-2'>
          <Icon icon='lucide:package' className='text-6xl text-gray-400' />
          <p className='font-medium text-gray-600'>No packages</p>
        </div>
      ) : (
        <div className='my-6 flex flex-wrap gap-4'>
          {packages.map((pkg, index) => (
            <PackageCard
              key={index}
              title={pkg.name || 'Unknown title'}
              photographer={pkg.photographer?.name || 'Annonymous'}
              category={pkg.category?.name || 'Unknown category'}
              price={pkg.price ? `${pkg.price}` : 'Price not available'}
              imageUrl={pkg.media?.[0]?.pictureUrl || MockPhotoCard.src}
              photographerId={photographer.id}
              alt={pkg.name || 'package photo'}
            />
          ))}
        </div>
      )}
    </div>
  )
}
