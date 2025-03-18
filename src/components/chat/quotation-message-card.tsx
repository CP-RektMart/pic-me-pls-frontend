import type { QuotationMessage } from '@/actions/chat/get-chat'
import { BaseMessage } from '@/actions/chat/get-chat'

interface QuotationMessageProps {
  message: BaseMessage & QuotationMessage
}

export default function QuotationMessage({ message }: QuotationMessageProps) {
  return (
    <div className='flex h-64 w-72 flex-col p-4'>
      <div className='flex flex-row text-base font-bold'>
        {message.messageType}
      </div>
    </div>
  )
}
