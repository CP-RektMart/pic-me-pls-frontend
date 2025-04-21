import React from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export interface ReportDialogProps {
  id: number
  title: string
  message: string
  status: string
  handleAcceptReport: (reportId: number) => void
  handleDeclineReport: (reportId: number) => void
}

const ReportDialog = ({
  id,
  title,
  message,
  status,
  handleAcceptReport,
  handleDeclineReport,
}: ReportDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report</DialogTitle>
        </DialogHeader>
        <div className='space-y-4 text-sm'>
          <div>
            <h4 className='text-xs text-zinc-400'>Title</h4>
            <p>{title}</p>
          </div>
          <div>
            <h4 className='text-xs text-zinc-400'>Description</h4>
            <p>{message}</p>
          </div>
        </div>
        <DialogFooter>
          <Button
            className='font-normal'
            onClick={() => {
              handleAcceptReport(id)
            }}
            disabled={status !== 'REPORTED'}
          >
            Accept
          </Button>
          <Button
            className='font-normal'
            variant='destructive'
            onClick={() => {
              handleDeclineReport(id)
            }}
            disabled={status !== 'REPORTED'}
          >
            Decline
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ReportDialog
