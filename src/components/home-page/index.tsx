'use client'

import { useReducer } from 'react'

import { getPackages } from '@/actions/get-packages'
import { Category, User } from '@/types/user'

import { handleFilter } from './filterReducer'
import Greeting from './greeting'
import SearchBar from './search-bar'

export default function HomePageComponent({
  userProfile,
  categories,
}: {
  userProfile?: User
  categories: Category[]
}) {
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
    const packages = packagesResponse?.data ?? []
    console.log(packages)
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
    </div>
  )
}
