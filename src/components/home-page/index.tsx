'use client'

import { useReducer } from 'react'

import { Category, User } from '@/types/user'

import { handleFilter } from './filterReducer'
import Greeting from './greeting'
import SearchBar from './search-bar'

export default function HomePageComponent({
  userProfile,
  categories,
  onSearchClick,
}: {
  userProfile?: User
  categories: Category[]
  onSearchClick: () => void
}) {
  const [filters, dispatch] = useReducer(handleFilter, {
    sort: '',
    minPrice: '',
    maxPrice: '',
    categories: [],
    searchText: '',
  })

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
