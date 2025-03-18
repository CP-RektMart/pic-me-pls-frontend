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
    <div className='flex flex-row space-x-2.5 py-2'>
      {sender !== userRole && (
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
      <p className='rounded-2xl bg-white px-3 py-2 text-base'>{message}</p>
    </div>
  )
}
