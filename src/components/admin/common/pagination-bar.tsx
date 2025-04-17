'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface PaginationProps {
  page: number
  totalPage: number
  handlePageChange: (page: number) => void
}

export default function PaginationBar({
  page,
  totalPage,
  handlePageChange,
}: PaginationProps) {
  const getPaginationItems = () => {
    const items = []

    // Always show first page
    items.push(
      <PaginationItem key='page-1'>
        <PaginationLink
          href='#'
          isActive={page === 1}
          onClick={(e) => {
            e.preventDefault()
            handlePageChange(1)
          }}
        >
          1
        </PaginationLink>
      </PaginationItem>
    )

    // Add ellipsis if needed
    if (page > 3) {
      items.push(
        <PaginationItem key='ellipsis-1'>
          <PaginationEllipsis />
        </PaginationItem>
      )
    }

    // Add pages around current page
    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(totalPage - 1, page + 1);
      i++
    ) {
      if (i === 1 || i === totalPage) continue // Skip first and last as they're always shown
      items.push(
        <PaginationItem key={`page-${i}`}>
          <PaginationLink
            href='#'
            isActive={page === i}
            onClick={(e) => {
              e.preventDefault()
              handlePageChange(i)
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    // Add ellipsis if needed
    if (page < totalPage - 2) {
      items.push(
        <PaginationItem key='ellipsis-2'>
          <PaginationEllipsis />
        </PaginationItem>
      )
    }

    // Always show last page if there's more than 1 page
    if (totalPage > 1) {
      items.push(
        <PaginationItem key={`page-${totalPage}`}>
          <PaginationLink
            href='#'
            isActive={page === totalPage}
            onClick={(e) => {
              e.preventDefault()
              handlePageChange(totalPage)
            }}
          >
            {totalPage}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return items
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href='#'
            onClick={(e) => {
              e.preventDefault()
              handlePageChange(page - 1)
            }}
            className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>

        {getPaginationItems()}

        <PaginationItem>
          <PaginationNext
            href='#'
            onClick={(e) => {
              e.preventDefault()
              handlePageChange(page + 1)
            }}
            className={
              page >= totalPage ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
