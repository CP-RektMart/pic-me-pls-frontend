'use client'

import { useReducer, useState } from 'react'

import { getPackages } from '@/actions/get-packages'
import { Category, Package, User } from '@/types/user'
import ProfileMockImage from '@public/images/profile-mock-image.png'

import { handleFilter } from '@/components/home-page/filterReducer'
import Greeting from '@/components/home-page/greeting'
import { PackageProps } from '@/components/home-page/package-card'
import PackageGrid from '@/components/home-page/package-grid'
import SearchBar from '@/components/home-page/search-bar'

export default function HomePageComponent({
  userProfile,
  categories,
}: {
  userProfile?: User
  categories: Category[]
}) {
  const [packages, setPackages] = useState<PackageProps[]>([])
  const [filters, dispatch] = useReducer(handleFilter, {
    sort: '',
    minPrice: '',
    maxPrice: '',
    categories: [],
    searchText: '',
  })

  const onSearchClick = async () => {
    const packagesResponse = await getPackages({
      name: filters.searchText,
      minPrice: Number(filters.minPrice),
      maxPrice: Number(filters.maxPrice),
      categoryIds: filters.categories,
      page: 1,
      pageSize: 10,
    })
    const packagesData = packagesResponse?.data ?? []
    const parsedPackages: PackageProps[] = packagesData.map((pkg: Package) => ({
      title: pkg.name ?? 'Unknown title',
      photographer: pkg.photographer?.name ?? 'Annonymous',
      price: pkg.price ? `$${pkg.price}` : 'Price not available',
      imageUrl: pkg.photographer?.profilePictureUrl ?? ProfileMockImage.src,
    }))
    setPackages(parsedPackages)
  }

  return (
    <div className='max-w-screen flex w-full flex-col px-4 pt-4 md:px-32'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center'>
        <Greeting
          userName={userProfile?.name}
          userProfilePictureUrl={userProfile?.profilePictureUrl}
        />
        <SearchBar
          categories={categories}
          filters={filters}
          handleFilter={dispatch}
          onSearchClick={onSearchClick}
        />
      </div>
      <div className='my-6'>
        <PackageGrid packagecards={packages} />
      </div>
    </div>
  )
}
