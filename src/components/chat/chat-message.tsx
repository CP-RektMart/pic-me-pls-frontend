import ProfilePic from '@public/images/profile-mock-image.png'
import Image from 'next/image'

interface ChatMessageProps {
  message: string
  sender: 'photographer' | 'customer'
  userRole: 'photographer' | 'customer'
}

export default function ChatMessage({
  message,
  sender,
  userRole,
}: ChatMessageProps) {
  return (
    <div className='space-x-2.5 rounded-2xl bg-white px-3 py-2'>
      {sender === userRole ? null : (
        <div>
          <Image
            className='h-8 w-8 rounded-full'
            src={ProfilePic.src}
            alt='Profile photo'
            width={32}
            height={32}
          />
        </div>
      )}
      <p className='text-base font-medium'>{message}</p>
    </div>
  )
}
