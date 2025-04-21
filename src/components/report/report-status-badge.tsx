'use client'

import { cn } from '@/lib/utils'

import { Badge } from '@/components/ui/badge'

interface ReportStatusBadgeProps {
  status: string
}

const statusMap: Record<string, string> = {
  REPORTED: 'Pending',
  ACCEPTED: 'Accepted',
  DECLINED: 'Declined',
}

export default function ReportStatusBadge({ status }: ReportStatusBadgeProps) {
  return (
    <Badge
      className={cn(
        status === 'REPORTED' ? 'bg-zinc-100 text-zinc-700' : '',
        status === 'ACCEPTED' ? 'bg-emerald-100 text-emerald-700' : '',
        status === 'DECLINED' ? 'bg-red-100 text-red-700' : ''
      )}
    >
      {statusMap[status] || 'Unknown'}
    </Badge>
  )
}
