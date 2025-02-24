import React from 'react'

import { cn } from '@/lib/utils'

import { Separator } from '@/components/ui/separator'

interface QuotationDetailsProps {
  quotationId: number
  status: 'Pending' | 'Confirm' | 'Paid' | 'Cancelled'
  packageName: string
  photographerName: string
  customerName: string
  from: string
  to: string
  description: string
  duration: number
  totalPrice: number
}

const statusColor = {
  Pending: 'text-amber-600',
  Confirm: 'text-sky-600',
  Paid: 'text-emerald-600',
  Cancelled: 'text-red-600',
}

export default function QuotationDetails({
  quotationId,
  status,
  packageName,
  photographerName,
  customerName,
  from,
  to,
  description,
  duration,
  totalPrice,
}: QuotationDetailsProps) {
  const detailItems = [
    { title: 'Quotation ID', info: quotationId },
    { title: 'Status', info: status, style: statusColor[status] },
    { title: 'Package Name', info: packageName },
    { title: 'Photographer Name', info: photographerName },
    { title: 'Customer Name', info: customerName },
    { title: 'From', info: from },
    { title: 'To', info: to },
    { title: 'Description', info: description },
    { title: 'Duration', info: `${duration} Hour${duration > 1 ? 's' : ''}` },
    { title: 'Total Price', info: `${totalPrice} Baht` },
  ]
  return (
    <div className='flex justify-center p-4'>
      <div className='flex w-full flex-col'>
        {detailItems.map((item, i) => (
          <React.Fragment key={i}>
            <div className='flex flex-row justify-between'>
              <p className='text-nowrap text-sm text-zinc-700'>{item.title}</p>
              <p className={cn('w-[200px] text-end text-sm', item.style)}>
                {item.info}
              </p>
            </div>
            <Separator className='my-3 bg-zinc-200 last:hidden' />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
