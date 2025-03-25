import React from 'react'

import { cn } from '@/lib/utils'
import { type QuotationDetailsProps } from '@/types/quotation'

import { Separator } from '@/components/ui/separator'

const statusColor: { [key: string]: string } = {
  PENDING: 'text-amber-600',
  CONFIRMED: 'text-sky-600',
  PAID: 'text-emerald-600',
  CANCELLED: 'text-red-600',
  SUBMITTED: 'text-gray-600',
}

export function QuotationDetails({
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
    { title: 'Duration', info: duration },
    { title: 'Total Price', info: `${totalPrice} Baht` },
  ]

  return (
    <div className='flex flex-col justify-center px-4'>
      <div className='flex w-full flex-col'>
        {detailItems.map((item, i) => (
          <React.Fragment key={i}>
            <div className='flex flex-row justify-between'>
              <p className='text-nowrap text-sm text-zinc-700'>{item.title}</p>
              <p
                className={cn(
                  'max-w-[250px] truncate text-end text-sm',
                  item.style
                )}
              >
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
