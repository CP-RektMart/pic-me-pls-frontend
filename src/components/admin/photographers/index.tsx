'use client'

import { useEffect, useState } from 'react'

import banPhotographer from '@/actions/admin/ban-photographer'
import unbanPhotographer from '@/actions/admin/unban-photographer'
import { getPhotographerAdmin } from '@/actions/photographers/get-photographers-admin'
import { PhotographerAdmin } from '@/types/photographer'

import PaginationBar from '@/components/admin/common/pagination-bar'
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

export default function AdminPhotographers() {
  const pageSize = 10
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [photographers, setPhotographers] = useState<PhotographerAdmin[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  const fetchPhotographers = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await getPhotographerAdmin({ name: search, page, pageSize })
      setPhotographers(res.data)
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
    try {
      await banPhotographer(Number(photographerId))
      fetchPhotographers()
    } catch (err) {
      setError('Failed to ban photographer')
      console.error('Error banning photographer:', err)
    }
  }

  const handleUnbanPhotographer = async (photographerId: string) => {
    try {
      await unbanPhotographer(Number(photographerId))
      fetchPhotographers()
    } catch (err) {
      setError('Failed to unban photographer')
      console.error('Error unbanning photographer:', err)
    }
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
            placeholder='Search Photographer'
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
                photographers.map((p, i) => {
                  const isBanned = p.isBanned
                  const textClass = isBanned ? 'text-slate-300' : ''
                  const rowIndex = (page - 1) * pageSize + i + 1

                  return (
                    <TableRow key={p?.id}>
                      <TableCell className={`p-4 ${textClass}`}>
                        #{rowIndex}
                      </TableCell>
                      <TableCell className={`max-w-24 truncate ${textClass}`}>
                        <Avatar>
                          <AvatarImage
                            src={p?.profilePictureUrl}
                            alt={p?.name}
                          />
                          <AvatarFallback>
                            {p?.name?.charAt(0)?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className={`max-w-24 truncate ${textClass}`}>
                        {p?.name}
                      </TableCell>
                      <TableCell className={textClass}>{p?.email}</TableCell>
                      <TableCell className={textClass}>
                        {p?.phoneNumber}
                      </TableCell>
                      <TableCell>
                        {isBanned ? (
                          <Button
                            variant='unban'
                            onClick={() =>
                              p?.id && handleUnbanPhotographer(p.id.toString())
                            }
                          >
                            Unban
                          </Button>
                        ) : (
                          <Button
                            variant='destructive'
                            onClick={() =>
                              p?.id && handleBanPhotographer(p.id.toString())
                            }
                          >
                            Ban
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}

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
