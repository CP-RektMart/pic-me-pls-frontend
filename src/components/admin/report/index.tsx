'use client'

import { useEffect, useState } from 'react'

import { acceptReport } from '@/actions/admin/accept-report'
import { declineReport } from '@/actions/admin/decline-report'
import { getAllReports } from '@/actions/admin/get-all-report'
import { Report } from '@/types/report'

import PaginationBar from '@/components/admin/common/pagination-bar'
import SearchBar from '@/components/admin/common/search-bar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import ReportStatusBadge from '../../report/report-status-badge'
import ReportDialog from './report-dialog'

export function AdminReport() {
  const pageSize = 10
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  const fetchReports = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await getAllReports({ title: search, page, pageSize })
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

  const handleSearch = () => {
    setPage(1)
    fetchReports()
  }

  const handleAcceptReport = async (reportId: number) => {
    setLoading(true)
    setError('')
    try {
      await acceptReport(reportId)
      fetchReports()
    } catch (err) {
      setError('Failed to accept report')
      console.error('Error accepting report:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeclineReport = async (reportId: number) => {
    setLoading(true)
    setError('')
    try {
      await declineReport(reportId)
      fetchReports()
    } catch (err) {
      setError('Failed to decline report')
      console.error('Error declining report:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex h-full flex-col gap-6 overflow-auto'>
      <h1 className='text-2xl font-bold'>Report Manager</h1>
      <div className='flex h-full flex-col justify-between gap-2 rounded-xl bg-white p-6'>
        <div className='overflow-scroll'>
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSearch={handleSearch}
            placeholder='Search by title'
          />

          <Table className='mb-2 font-medium'>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead className='max-w-24 truncate'>Title</TableHead>
                <TableHead className='max-w-24 truncate'>Description</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>Status</TableHead>
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
                      <ReportStatusBadge status={report?.status || ''} />
                    </TableCell>
                    <TableCell>
                      <ReportDialog
                        id={report?.id || 0}
                        title={report?.title || ''}
                        message={report?.message || ''}
                        status={report?.status || ''}
                        handleAcceptReport={handleAcceptReport}
                        handleDeclineReport={handleDeclineReport}
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
