import type { ImageMessage, QuotationMessage } from '@/actions/chat/get-chat'
import { BaseMessage } from '@/actions/chat/get-chat'
import { formatDateToString } from '@/lib/utils'
import { QuotationStatus } from '@/types/quotation'
import { Icon } from '@iconify/react'

import { QuotationStatusTag } from '@/components/quotation/quotation-status-tag'

import { Button } from '../ui/button'

interface QuotationMessageProps {
  message: BaseMessage & (QuotationMessage | ImageMessage)
}

export default function QuotationMessage({ message }: QuotationMessageProps) {
  if (message.type !== 'quotation') return null

  const quotation = message.quotation

  return (
    <div className='flex flex-col space-y-3 rounded-2xl bg-white p-4'>
      <div className='flex flex-row items-center justify-between'>
        <p className='font-bold'>{message.messageType}</p>
        <QuotationStatusTag variant={quotation.status as QuotationStatus} />
      </div>

      <div className='text-xl font-bold'>{quotation.quotationID}</div>

      <div className='flex flex-row space-x-3'>
        <Icon icon='lucide:package' className='size-5' />
        <p className='text-blue-600 underline decoration-solid decoration-1 underline-offset-1'>
          {quotation.packageName}
        </p>
      </div>

      <div className='flex flex-row space-x-3'>
        <Icon icon='lucide:calendar' className='size-5 self-center' />
        <p>
          {formatDateToString(quotation.from)} -{' '}
          {formatDateToString(quotation.to)}
        </p>
      </div>

      <div className='flex flex-row space-x-3'>
        <Icon icon='lucide:banknote' className='size-5 self-center' />
        <p>{quotation.price} Baht</p>
      </div>

      <Button
        onClick={() => {
          console.log('View Quotation ' + quotation.quotationID)
        }}
      >
        View
      </Button>
    </div>
  )
}
