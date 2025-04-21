'use client'

import { useEffect, useState } from 'react'

import deletePackage from '@/actions/admin/delete-package'
import { getPackages } from '@/actions/packages/get-packages'
import { PackageVerbose } from '@/types/package'
import Link from 'next/link'

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

export default function AdminPackage() {
  const pageSize = 10
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [packages, setPackages] = useState<PackageVerbose[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  const fetchPackages = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await getPackages({ name: search, page, pageSize })
      setPackages(res.data)
      if (res.page === 1) {
        setTotalPage(res.totalPage)
      }
    } catch (err) {
      setError('Failed to fetch packages')
      console.error('Error fetching packages:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPackages()
  }, [page])

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage)
    }
  }

  const handleSearch = () => {
    setPage(1)
    fetchPackages()
  }

  const handleDeletePackage = async (id: number) => {
    setLoading(true)
    setError('')
    try {
      await deletePackage(id)
      fetchPackages()
    } catch (err) {
      setError('Failed to delete package')
      console.error('Error deleting package:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex h-full flex-col gap-6 overflow-auto'>
      <h1 className='text-2xl font-bold'>Package Manager</h1>
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
                <TableHead className='max-w-24 truncate'>Title</TableHead>
                <TableHead className='max-w-24 truncate'>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Photographer</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!loading &&
                packages.map((p) => (
                  <TableRow key={p?.id}>
                    <TableCell>#{p?.id}</TableCell>
                    <TableCell className='max-w-24 truncate'>
                      {p?.name}
                    </TableCell>
                    <TableCell className='max-w-24 truncate'>
                      {p?.description}
                    </TableCell>
                    <TableCell>{p?.price} THB/Hrs</TableCell>
                    <TableCell>
                      <span className='rounded-full bg-zinc-900 px-2 py-1 text-xs text-zinc-50'>
                        {p.category?.name}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/admin/photographers/${p.photographer?.id}`}
                        className='text-blue-600 underline hover:text-blue-700'
                      >
                        {p.photographer?.name?.split(' ')[0]}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant='destructive'
                        onClick={() => {
                          if (p?.id) {
                            handleDeletePackage(p.id)
                          }
                        }}
                      >
                        Delete
                      </Button>
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
              {!loading && packages.length === 0 && !error && (
                <TableRow>
                  <TableCell colSpan={7} className='py-4 text-center'>
                    No packages found
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
