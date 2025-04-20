'use client'

import { useEffect, useState } from 'react'

import getUnverifiedCitizenCards from '@/actions/admin/get-citizen-card-unverify'
import verifyPhotographer from '@/actions/admin/verify-photographer'
import { components } from '@/api/schema'
import FallBackImage from '@public/images/fallBackProfileImage.png'
import Image from 'next/image'

import PaginationBar from '@/components/admin/common/pagination-bar'
import SearchBar from '@/components/admin/common/search-bar'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type UnverifiedPhotographer =
  components['schemas']['dto.ListUnverifiedPhotographerResponse']

export default function AdminVerificationPage() {
  const pageSize = 5
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [photographers, setPhotographers] = useState<UnverifiedPhotographer[]>(
    []
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  const fetchData = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await getUnverifiedCitizenCards({
        page,
        pageSize,
        name: search,
      })
      setPhotographers(res.data)
      if (res.page === 1) {
        setTotalPage(res.totalPage)
      }
    } catch (err) {
      console.error(err)
      setError('Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [page])

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage)
    }
  }

  const handleSearch = () => {
    setPage(1)
    fetchData()
  }

  const handleVerify = async (id: number) => {
    try {
      await verifyPhotographer(id)
      setPhotographers((items) => items.filter((p) => p.id != id))
    } catch (err) {
      setError('Failed verify photographer')
      console.log('Failed verify photographer: ', err)
    }
  }

  return (
    <div className='flex h-full flex-col gap-6 overflow-auto'>
      <h1 className='text-2xl font-bold'>Review Verification</h1>
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
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Citizen Card</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!loading &&
                photographers.map((p, i) => (
                  <TableRow key={p.id}>
                    <TableCell className='p-4'>
                      #{(page - 1) * pageSize + i + 1}
                    </TableCell>
                    <TableCell className='p-4'>
                      <Image
                        src={p.profilePictureUrl || FallBackImage}
                        alt='profile'
                        width={40}
                        height={40}
                        className='rounded-full object-cover'
                      />
                    </TableCell>
                    <TableCell className='p-4'>
                      <div className='flex items-center'>
                        <span>{p.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className='p-4'>
                      <div className='flex items-center'>
                        <Image
                          src={p.citizenCard?.picture || FallBackImage}
                          alt='citizen-card'
                          width={40}
                          height={40}
                          className='rounded'
                        />
                      </div>
                    </TableCell>
                    <TableCell className='p-4'>
                      <Button
                        className='px-4 py-2'
                        onClick={() => p.id && handleVerify(p.id)}
                      >
                        Verify
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              {loading && (
                <TableRow>
                  <TableCell colSpan={5} className='py-4 text-center'>
                    Loading...
                  </TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className='py-4 text-center text-red-500'
                  >
                    {error}
                  </TableCell>
                </TableRow>
              )}
              {!loading && photographers.length === 0 && !error && (
                <TableRow>
                  <TableCell colSpan={5} className='py-4 text-center'>
                    No unverified photographers found
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
