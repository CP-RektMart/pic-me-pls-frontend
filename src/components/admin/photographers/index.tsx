'use client'

import { useEffect, useState } from 'react'

import { getPhotographerAdmin } from '@/actions/photographers/get-photographers-admin'

import SearchBar from '@/components/admin/common/search-bar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import PaginationBar from '../common/pagination-bar'

type Photographer = {
  id: string
  profilePictureUrl: string
  name: string
  email: string
  phoneNumber: string
  isBanned: boolean
}

export default function AdminPhotographers() {
  const pageSize = 10
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [photographers, setPhotographers] = useState<Photographer[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  const fetchPhotographers = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await getPhotographerAdmin({ name: search, page, pageSize })
      setPhotographers(res)
      if (res.page === 1) {
        setTotalPage(res.totalPage)
      }
    } catch (err) {
      setError('Failed to fetch photographers')
      console.error('Error fetching photographers:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPhotographers()
  }, [page])

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage)
    }
  }

  const handleSearch = () => {
    setPage(1)
    fetchPhotographers()
  }

  const handleBanPhotographer = async (photographerId: string) => {
    console.log('ban photographer', photographerId)
  }
  const handleUnbanPhotographer = async (photographerId: string) => {
    console.log('unban photographer', photographerId)
  }
  const handleViewPhotographer = async (photographerId: string) => {
    console.log('view photographer', photographerId)
  }

  return (
    <div className='flex h-full flex-col gap-6 overflow-auto'>
      <h1 className='text-2xl font-bold'>Photographer Manager</h1>
      <div className='flex h-full flex-col justify-between gap-2 rounded-xl bg-white p-6'>
        <div>
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSearch={handleSearch}
            placeholder='Search Package'
          />

          <Table className='mb-2 font-medium'>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead className='max-w-24 truncate'>Image</TableHead>
                <TableHead className='max-w-24 truncate'>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!loading &&
                photographers.map((p, i) => (
                  <TableRow key={p?.id}>
                    <TableCell className='p-4'>
                      #{(page - 1) * pageSize + i + 1}
                    </TableCell>
                    <TableCell className='max-w-24 truncate'>
                      <Avatar>
                        <AvatarImage src={p?.profilePictureUrl} alt={p?.name} />
                        <AvatarFallback>
                          {p?.name?.charAt(0)?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className='max-w-24 truncate'>
                      {p?.name}
                    </TableCell>
                    <TableCell>{p?.email}</TableCell>
                    <TableCell>{p?.phoneNumber}</TableCell>
                    <TableCell>
                      <div className='flex gap-2'>
                        <Button onClick={() => handleViewPhotographer(p?.id)}>
                          View
                        </Button>
                        {p?.isBanned ? (
                          <Button
                            variant='unban'
                            onClick={() => handleUnbanPhotographer(p?.id)}
                          >
                            Unban
                          </Button>
                        ) : (
                          <Button
                            variant='destructive'
                            onClick={() => handleBanPhotographer(p?.id)}
                          >
                            Ban
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              {loading && (
                <TableRow>
                  <TableCell colSpan={7} className='py-4 text-center'>
                    Loading...
                  </TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className='py-4 text-center text-red-500'
                  >
                    {error}
                  </TableCell>
                </TableRow>
              )}
              {!loading && photographers.length === 0 && !error && (
                <TableRow>
                  <TableCell colSpan={7} className='py-4 text-center'>
                    No photographers found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {totalPage > 0 && (
          <PaginationBar
            page={page}
            totalPage={totalPage}
            handlePageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  )
}
