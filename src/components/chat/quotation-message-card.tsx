import { formatDateToString } from '@/lib/utils'
import { Message } from '@/types/messages'
import { Quotation, QuotationStatus } from '@/types/quotation'
import { Icon } from '@iconify/react'
import Link from 'next/link'

import { QuotationStatusTag } from '@/components/quotation/quotation-status-tag'

import { Button } from '../ui/button'

interface QuotationMessageProps {
  message: Message
}

export default function QuotationMessage({ message }: QuotationMessageProps) {
  if (message.type !== 'QUOTATION') return null

  const quotation: Quotation = JSON.parse(message.content)

  return (
    <div className='flex flex-col space-y-3 rounded-2xl bg-white p-4'>
      <div className='flex flex-row items-center justify-between'>
        <p className='font-bold'>New Quotation</p>
        <QuotationStatusTag variant={quotation.status as QuotationStatus} />
      </div>

      <div className='text-xl font-bold'>{quotation.id}</div>

      <div className='flex flex-row space-x-3'>
        <Link href={'/packages/' + quotation.package?.id}>
          <Icon icon='lucide:package' className='size-5' />
          <p className='text-blue-600 underline decoration-solid decoration-1 underline-offset-1'>
            {quotation.package?.name}
          </p>
        </Link>
      </div>

      <div className='flex flex-row space-x-3'>
        <Icon icon='lucide:calendar' className='size-5 self-center' />
        <p>
          {formatDateToString(new Date(quotation.fromDate || ''))} -{' '}
          {formatDateToString(new Date(quotation.toDate || ''))}
        </p>
      </div>

      <div className='flex flex-row space-x-3'>
        <Icon icon='lucide:banknote' className='size-5 self-center' />
        <p>{quotation.price} Baht</p>
      </div>

      <Link href={'/quotation/' + quotation.id}>
        <Button>View</Button>
      </Link>
    </div>
  )
}
