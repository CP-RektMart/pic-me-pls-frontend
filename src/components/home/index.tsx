'use client'

import { useEffect, useReducer, useState } from 'react'

import { getPackages } from '@/actions/packages/get-packages'
import { Pagination } from '@/types'
import { Category } from '@/types/category'
import { PackageVerbose } from '@/types/package'
import { User } from '@/types/user'

import { Container } from '@/components/container'
import { handleFilter } from '@/components/home/filterReducer'
import Greeting from '@/components/home/greeting'
import PaginationBar from '@/components/home/pagination-bar'
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
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(initialPackages.totalPage)

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
      pageSize: 6,
    })
    setPackages(sortPackages(searchedPackage.data, filters.sort))
    setTotalPage(searchedPackage.totalPage)
    setPage(1)
  }

  const handlePageChange = async (newPage: number) => {
    const paginatedPackage = await getPackages({
      name: filters.searchText,
      minPrice: Number(filters.minPrice),
      maxPrice: Number(filters.maxPrice),
      categoryIds: filters.categories,
      page: newPage,
      pageSize: 6,
    })
    setPackages(sortPackages(paginatedPackage.data, filters.sort))
    setTotalPage(paginatedPackage.totalPage)
    setPage(newPage)
  }

  useEffect(() => {
    setPackages((prevPackages) => sortPackages(prevPackages, filters.sort))
  }, [filters.sort])

  return (
    <div className='flex w-dvw flex-col'>
      <Container className='space-y-6 py-6'>
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
      </Container>
      <PaginationBar
        page={page}
        totalPage={totalPage}
        handlePageChange={handlePageChange}
      />
    </div>
  )
}
