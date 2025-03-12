'use client'

import { useReducer } from 'react'

import { Category, User } from '@/types/user'

import { handleFilter } from './filterReducer'
import Greeting from './greeting'
import { PackageProps } from './package-card'
import PackageGrid from './package-grid'
import SearchBar from './search-bar'

const mockPackages: PackageProps[] = Array.from({ length: 12 }, (_, index) => ({
  title: `Pre-wedding Outdoor ${index + 1}`,
  location: 'Hatyai, Songkhla',
  photographer: 'Chanatpakorn Sirintronsopon',
  price: '$1,200',
  imageUrl: 'image.png',
}))

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
        />
      </div>
      <div className='my-6'>
        <PackageGrid packagecards={mockPackages} />
      </div>
    </div>
  )
}
