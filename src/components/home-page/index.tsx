'use client'

import { useEffect, useReducer, useState } from 'react'

import { getQueryPackages } from '@/actions/get-query-packages'
import { Category } from '@/types/category'
import { Package } from '@/types/package'
import { User } from '@/types/user'
import ProfileMockImage from '@public/images/profile-mock-image.png'

import { handleFilter } from '@/components/home-page/filterReducer'
import Greeting from '@/components/home-page/greeting'
import { PackageProps } from '@/components/home-page/package-card'
import PackageGrid from '@/components/home-page/package-grid'
import SearchBar from '@/components/home-page/search-bar'

export default function HomePageComponent({
  userProfile,
  categories,
  initialPackages,
}: {
  userProfile?: User
  categories: Category[]
  initialPackages: PackageProps[]
}) {
  const [packages, setPackages] = useState<PackageProps[]>(initialPackages)
  const [filters, dispatch] = useReducer(handleFilter, {
    sort: 'ASC',
    minPrice: '',
    maxPrice: '',
    categories: [],
    searchText: '',
  })

  const sortPackages = (packagesData: PackageProps[], sortType: string) => {
    return [...packagesData].sort((a, b) =>
      sortType === 'ASC'
        ? Number(a.price) - Number(b.price)
        : Number(b.price) - Number(a.price)
    )
  }

  const onSearchClick = async () => {
    const packagesResponse = await getQueryPackages({
      name: filters.searchText,
      minPrice: Number(filters.minPrice),
      maxPrice: Number(filters.maxPrice),
      categoryIds: filters.categories,
      page: 1,
      pageSize: 10,
    })

    const packagesData = packagesResponse?.data ?? []
    const packageProps: PackageProps[] = packagesData.map((pkg: Package) => ({
      title: pkg.name ?? 'Unknown title',
      photographer: pkg.photographer?.name ?? 'Annonymous',
      category: pkg.category?.name ?? 'Unknown category',
      price: pkg.price ? `${pkg.price}` : 'Price not available',
      imageUrl: pkg.media?.[0]?.pictureUrl ?? ProfileMockImage.src,
    }))
    setPackages(sortPackages(packageProps, filters.sort))
  }

  useEffect(() => {
    setPackages((prevPackages) => sortPackages(prevPackages, filters.sort))
  }, [filters.sort])

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
