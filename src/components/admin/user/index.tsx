'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { User } from '@/types/user'
import Image from 'next/image'
import Link from 'next/link'

import PaginationBar from '@/components/admin/common/pagination-bar'
import SearchBar from '@/components/admin/common/search-bar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const mockUsers: User[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice.j@example.com',
    phoneNumber: '0812345678',
    bank: 'Bangkok Bank',
    bankBranch: 'Siam Square',
    accountNo: '123-456789-0',
    facebook: 'alice.johnson',
    instagram: 'alice.j',
    profilePictureUrl: '/images/profile-mock-image.png',
    role: 'CUSTOMER',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    phoneNumber: '0823456789',
    bank: 'Kasikorn Bank',
    bankBranch: 'Central World',
    accountNo: '234-567890-1',
    facebook: 'bob.smith',
    instagram: 'bobby_smith',
    profilePictureUrl: '/images/profile-mock-image.png',
    role: 'ADMIN',
  },
  {
    id: 3,
    name: 'Charlie Lee',
    email: 'charlie.lee@example.com',
    phoneNumber: '0834567890',
    bank: 'SCB',
    bankBranch: 'Chulalongkorn',
    accountNo: '345-678901-2',
    facebook: 'charlie.lee',
    instagram: 'charliel',
    profilePictureUrl: '/images/profile-mock-image.png',
    role: 'CUSTOMER',
  },
  {
    id: 4,
    name: 'Dana White',
    email: 'dana.white@example.com',
    phoneNumber: '0845678901',
    bank: 'Krungthai Bank',
    bankBranch: 'Silom',
    accountNo: '456-789012-3',
    facebook: 'dana.white',
    instagram: 'danawhite',
    profilePictureUrl: '/images/profile-mock-image.png',
    role: 'PHOTOGRAPHER',
  },
  {
    id: 5,
    name: 'Ethan Wong',
    email: 'ethan.w@example.com',
    phoneNumber: '0856789012',
    bank: 'TMBThanachart',
    bankBranch: 'Asoke',
    accountNo: '567-890123-4',
    facebook: 'ethan.wong',
    instagram: 'ethanw',
    profilePictureUrl: '/images/profile-mock-image.png',
    role: 'PHOTOGRAPHER',
  },
  {
    id: 6,
    name: 'Ethan Wong',
    email: 'ethan.w@example.com',
    phoneNumber: '0856789012',
    bank: 'TMBThanachart',
    bankBranch: 'Asoke',
    accountNo: '567-890123-4',
    facebook: 'ethan.wong',
    instagram: 'ethanw',
    profilePictureUrl: '/images/profile-mock-image.png',
    role: 'PHOTOGRAPHER',
  },
  {
    id: 7,
    name: 'Ethan Wong',
    email: 'ethan.w@example.com',
    phoneNumber: '0856789012',
    bank: 'TMBThanachart',
    bankBranch: 'Asoke',
    accountNo: '567-890123-4',
    facebook: 'ethan.wong',
    instagram: 'ethanw',
    profilePictureUrl: '/images/profile-mock-image.png',
    role: 'PHOTOGRAPHER',
  },
  {
    id: 8,
    name: 'Ethan Wong',
    email: 'ethan.w@example.com',
    phoneNumber: '0856789012',
    bank: 'TMBThanachart',
    bankBranch: 'Asoke',
    accountNo: '567-890123-4',
    facebook: 'ethan.wong',
    instagram: 'ethanw',
    profilePictureUrl: '/images/profile-mock-image.png',
    role: 'PHOTOGRAPHER',
  },
  {
    id: 9,
    name: 'Ethan Wong',
    email: 'ethan.w@example.com',
    phoneNumber: '0856789012',
    bank: 'TMBThanachart',
    bankBranch: 'Asoke',
    accountNo: '567-890123-4',
    facebook: 'ethan.wong',
    instagram: 'ethanw',
    profilePictureUrl: '/images/profile-mock-image.png',
    role: 'PHOTOGRAPHER',
  },
]

export default function AdminUser() {
  const pageSize = 6
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [users] = useState<User[]>(mockUsers)
  const [loading] = useState(false)
  const [error] = useState('')
  const [search, setSearch] = useState('')

  // const fetchUsers = async () => {
  //     setLoading(true)
  //     setError('')
  //     // TODO:
  // }

  useEffect(() => {
    const total = Math.ceil(users.length / pageSize)
    setTotalPage(total)
  }, [users])

  useEffect(() => {
    // TODO: fetch more
  }, [page])

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage)
    }
  }

  const handleSearch = () => {
    setPage(1)
    // TODO: fetch find
  }

  return (
    <div className='flex h-full flex-col gap-6 overflow-auto'>
      <h1 className='text-2xl font-bold'>User Manager</h1>
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
                <TableHead>Role</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!loading &&
                users.slice((page - 1) * pageSize, page * pageSize).map((p) => (
                  <TableRow key={p?.id}>
                    <TableCell>#{p?.id}</TableCell>

                    <TableCell className='max-w-24 truncate'>
                      <Link href='/' className='flex items-center'>
                        <Image
                          src={p.profilePictureUrl || ''}
                          alt={p.name || 'profile'}
                          className='size-12 rounded-full object-cover'
                          width={18}
                          height={18}
                        />
                      </Link>
                    </TableCell>
                    <TableCell className='max-w-24 truncate'>
                      {p?.name}
                    </TableCell>
                    <TableCell className='max-w-36 truncate'>
                      {p.email}
                    </TableCell>
                    <TableCell className='max-w-24 truncate'>
                      {p.phoneNumber?.replace(
                        /(\d{3})(\d{3})(\d{4})/,
                        '$1-$2-$3'
                      )}
                    </TableCell>
                    <TableCell className='max-w-24 truncate'>
                      <Badge
                        className={cn(
                          'w-fit shadow-none',
                          p.role === 'CUSTOMER'
                            ? 'bg-orange-100 text-orange-700'
                            : p.role === 'ADMIN'
                              ? 'bg-red-200 text-red-800'
                              : 'bg-blue-100 text-blue-700'
                        )}
                      >
                        {p.role &&
                          p.role.charAt(0).toUpperCase() +
                            p.role.slice(1).toLowerCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className='max-w-24 truncate'>
                      <Button>
                        {p.role === 'ADMIN' ? 'Mark as User' : ' Mark as Admin'}
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
              {!loading && users.length === 0 && !error && (
                <TableRow>
                  <TableCell colSpan={7} className='py-4 text-center'>
                    No Users found
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
