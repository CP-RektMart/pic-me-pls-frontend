import { cn } from '@/lib/utils'
import { Message } from '@/types/messages'
import Image from 'next/image'

interface ChatMessageProps {
  message: Message
  profilePictureUrl: string
  userId: number
}

export default function ChatMessage({
  message,
  profilePictureUrl,
  userId,
}: ChatMessageProps) {
  return (
    <div
      className={cn(
        'flex flex-row space-x-2.5',
        message.receiverId === userId ? 'justify-end' : 'justify-start'
      )}
    >
      {message.senderId === userId && (
        <div>
          <Image
            className='rounded-full object-cover'
            src={profilePictureUrl}
            alt='Profile photo'
            width={32}
            height={32}
          />
        </div>
      )}
      {/* {message.type === 'text' ? ( */}
      <p className='max-w-[75%] break-words rounded-2xl bg-white px-3 py-2'>
        {message.content}
      </p>
      {/* ) : ( */}
      {/* <QuotationMessage message={message} /> */}
      {/* )} */}
    </div>
  )
}
