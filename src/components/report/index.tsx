'use client'

import { useEffect, useState } from 'react'

import { getReports } from '@/actions/report/get-customer-reports'
import { Report } from '@/types/report'

import PaginationBar from '@/components/admin/common/pagination-bar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import ReportView from './report-view'

export function ReportPageComponent() {
  const pageSize = 10
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchReports = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await getReports({ page, pageSize })
      setReports(res.data)
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
    fetchReports()
  }, [page])

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage)
    }
  }

  return (
    <div className='flex h-full flex-col overflow-auto'>
      <h1 className='text-2xl font-bold'>Report</h1>
      <div className='flex h-full flex-col justify-between gap-2 p-6'>
        <div>
          <Table className='mb-2 font-medium'>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead className='max-w-24 truncate'>Title</TableHead>
                <TableHead className='max-w-24 truncate'>Description</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!loading &&
                reports.map((report) => (
                  <TableRow key={report?.id}>
                    <TableCell>#{report?.id}</TableCell>
                    <TableCell className='max-w-24 truncate'>
                      {report?.title}
                    </TableCell>
                    <TableCell className='max-w-24 truncate'>
                      {report?.message}
                    </TableCell>
                    <TableCell>{report?.createdAt}</TableCell>
                    <TableCell>{report?.updatedAt}</TableCell>
                    <TableCell>
                      <ReportView
                        title={report?.title || ''}
                        message={report?.message || ''}
                      />
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
              {!loading && reports.length === 0 && !error && (
                <TableRow>
                  <TableCell colSpan={7} className='py-4 text-center'>
                    No reports found
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
