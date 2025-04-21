'use client'

import { useEffect, useState } from 'react'

import { getAllUsers } from '@/actions/admin/get-all-users'
import setUserRole from '@/actions/admin/set-user-role'
import { phoneNumberFormatter } from '@/lib/utils'
import { PublicUser } from '@/types/user'

import PaginationBar from '@/components/admin/common/pagination-bar'
import SearchBar from '@/components/admin/common/search-bar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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

export default function AdminUser() {
  const pageSize = 10
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [publicUsers, setPublicUsers] = useState<PublicUser[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  const fetchPublicUsers = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await getAllUsers({ name: search, page, pageSize })
      setPublicUsers(res.data)
      if (res.page === 1) {
        setTotalPage(res.totalPage)
      }
    } catch (err) {
      setError('Failed to fetch public users')
      console.error('Error fetching public users:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPublicUsers()
  }, [page])

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage)
    }
  }

  const handleSearch = () => {
    setPage(1)
    fetchPublicUsers()
  }

  const updatePublicUser = async (id: number) => {
    setError('')
    try {
      const user = publicUsers.find((p) => p.id === id)
      if (!user) throw new Error('User not found')

      const newRole = user.role === 'ADMIN' ? 'User' : 'ADMIN'
      await setUserRole(id, user.role === 'ADMIN')

      setPublicUsers((prev) =>
        prev.map((p) => (p.id === id ? { ...p, role: newRole } : p))
      )
    } catch (err) {
      console.error('Error updating public users:', err)
      setError('Failed to update public user')
    }
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
            placeholder='Search User'
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
                publicUsers.map((user) => (
                  <TableRow key={user?.id}>
                    <TableCell>#{user?.id}</TableCell>
                    <TableCell className='max-w-24 truncate'>
                      <Avatar>
                        <AvatarImage
                          src={user?.profilePictureUrl}
                          alt={user?.name}
                        />
                        <AvatarFallback>
                          {user?.name?.charAt(0)?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className='max-w-24 truncate'>
                      {user?.name}
                    </TableCell>
                    <TableCell>{user?.email}</TableCell>
                    <TableCell>
                      {user.phoneNumber &&
                        phoneNumberFormatter(user.phoneNumber)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user?.role === 'ADMIN'
                            ? 'admin'
                            : user?.role === 'CUSTOMER'
                              ? 'customer_um'
                              : 'photographer'
                        }
                      >
                        {user?.role?.toLowerCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          if (user.id) {
                            updatePublicUser(user.id)
                          }
                        }}
                      >
                        {user?.role != 'ADMIN'
                          ? 'Mark as Admin'
                          : 'Mark as User'}
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
              {!loading && publicUsers.length === 0 && !error && (
                <TableRow>
                  <TableCell colSpan={7} className='py-4 text-center'>
                    No users found
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
