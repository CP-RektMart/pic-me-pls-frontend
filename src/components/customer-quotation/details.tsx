import React from 'react'

import { cn } from '@/lib/utils'
import { type QuotationDetailsProps } from '@/types/quotation'

import { Separator } from '@/components/ui/separator'

const statusColor: { [key: string]: string } = {
  Pending: 'text-amber-600',
  Confirm: 'text-sky-600',
  Paid: 'text-emerald-600',
  Cancelled: 'text-red-600',
}

export default function QuotationDetails({
  quotationId,
  quotationStatus,
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
    {
      title: 'Status',
      info: quotationStatus,
      style: statusColor[quotationStatus],
    },
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
    <div className='flex justify-center px-4'>
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
