import React from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '../ui/button'

export interface ReportViewProps {
  title: string
  message: string
}

const ReportView = ({ title, message }: ReportViewProps) => {
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
      </DialogContent>
    </Dialog>
  )
}

export default ReportView
