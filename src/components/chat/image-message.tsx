import type { BaseMessage, ImageMessage } from '@/actions/chat/get-chat'
import Image from 'next/image'

interface ImageMessageProps {
  message: BaseMessage & ImageMessage
}

export default function ImageMessage({ message }: ImageMessageProps) {
  return (
    <div className='max-w-[75%] rounded-2xl bg-white p-2'>
      <Image
        src={message.imageUrl}
        alt='Image message'
        width={250}
        height={250}
        className='rounded-md object-cover'
      />
    </div>
  )
}
