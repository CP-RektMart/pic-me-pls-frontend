'use client'

import { useEffect, useReducer, useState } from 'react'

import { getPackages } from '@/actions/packages/get-packages'
import { Pagination } from '@/types'
import { Category } from '@/types/category'
import { PackageVerbose } from '@/types/package'
import { User } from '@/types/user'

import { handleFilter } from '@/components/home/filterReducer'
import Greeting from '@/components/home/greeting'
import SearchBar from '@/components/home/search-bar'

import PackageGrid from './package-grid'

interface HomePageProps {
  profile: User | undefined
  categories: Pagination<Category>
  initialPackages: Pagination<PackageVerbose>
}

export default function HomePageComponent({
  profile,
  categories,
  initialPackages,
}: HomePageProps) {
  const [packages, setPackages] = useState<PackageVerbose[]>(
    initialPackages.data
  )
  const [filters, dispatch] = useReducer(handleFilter, {
    sort: 'ASC',
    minPrice: '',
    maxPrice: '',
    categories: [],
    searchText: '',
  })
  const sortPackages = (packagesData: PackageVerbose[], sortType: string) => {
    return [...packagesData].sort((a, b) =>
      sortType === 'ASC'
        ? Number(a.price) - Number(b.price)
        : Number(b.price) - Number(a.price)
    )
  }
  const onSearchClick = async () => {
    const searchedPackage = await getPackages({
      name: filters.searchText,
      minPrice: Number(filters.minPrice),
      maxPrice: Number(filters.maxPrice),
      categoryIds: filters.categories,
      page: 1,
      pageSize: 10,
    })

    setPackages(sortPackages(searchedPackage.data, filters.sort))
  }

  useEffect(() => {
    setPackages((prevPackages) => sortPackages(prevPackages, filters.sort))
  }, [filters.sort])

  return (
    <div className='max-w-screen flex w-full flex-col px-4 pt-4 md:px-32'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center'>
        <Greeting
          userName={profile?.name}
          userProfilePictureUrl={profile?.profilePictureUrl}
        />
        <SearchBar
          categories={categories.data}
          filters={filters}
          handleFilter={dispatch}
          onSearchClick={onSearchClick}
        />
      </div>
      <PackageGrid packages={packages} />
    </div>
  )
}
