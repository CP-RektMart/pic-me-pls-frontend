import { Message } from '@/actions/chat/get-chat'
import ProfilePic from '@public/images/profile-mock-image.png'
import Image from 'next/image'

import QuotationMessage from './quotation-message-card'

interface ChatMessageProps {
  message: Message
  userRole: 'photographer' | 'customer'
}

export default function ChatMessage({ message, userRole }: ChatMessageProps) {
  return (
    <div className='flex flex-row space-x-2.5 py-2'>
      {message.sender !== userRole && (
        <div>
          <Image
            className='rounded-full object-cover'
            src={ProfilePic.src}
            alt='Profile photo'
            width={32}
            height={32}
          />
        </div>
      )}
      {message.type === 'text' ? (
        <p className='rounded-2xl bg-white px-3 py-2 text-base'>
          {message.message}
        </p>
      ) : (
        <div className='rounded-2xl bg-white px-3 py-2 text-base'>
          <QuotationMessage message={message} />
        </div>
      )}
    </div>
  )
}
