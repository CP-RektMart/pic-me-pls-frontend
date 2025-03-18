import type { QuotationMessage } from '@/actions/chat/get-chat'
import { BaseMessage } from '@/actions/chat/get-chat'
import { formatDateToString } from '@/lib/utils'
import { Icon } from '@iconify/react'

interface QuotationMessageProps {
  message: BaseMessage & QuotationMessage
}

export default function QuotationMessage({ message }: QuotationMessageProps) {
  const quotation = message.quotation

  return (
    <div className='flex h-64 w-72 flex-col space-y-3 p-4'>
      <div className='flex flex-row text-base font-bold'>
        {message.messageType}
      </div>

      <div className='text-xl font-bold'>{quotation.quotationID}</div>

      <div className='flex flex-row space-x-3'>
        <Icon icon='lucide:package' className='size-5' />
        <p className='skip-ink text-base text-blue-600 underline decoration-solid decoration-1 underline-offset-1'>
          {quotation.packageName}
        </p>
      </div>

      <div className='flex flex-row space-x-3'>
        <Icon icon='lucide:calendar' className='size-5 self-center' />
        <p className='text-base'>
          {formatDateToString(quotation.from)} -{' '}
          {formatDateToString(quotation.to)}
        </p>
      </div>

      <div className='flex flex-row space-x-3'>
        <Icon icon='lucide:banknote' className='size-5 self-center' />
        <p className='text-base'>{quotation.price} Baht</p>
      </div>
    </div>
  )
}
