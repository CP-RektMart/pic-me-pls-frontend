import { Chat } from '@/actions/chat/get-chat'
import Image from 'next/image'

export default function ChatCard({
  chat,
  isPhotographer,
  profilePic,
}: {
  chat: Chat
  isPhotographer: boolean
  profilePic: string
}) {
  return (
    <div className='grid grid-cols-5 space-x-3'>
      <Image
        className='h-12 w-12 rounded-full'
        src={profilePic}
        alt='Profile photo'
        width={48}
        height={48}
      />
      <div className='col-span-4 flex flex-col'>
        <h2 className='text-base font-medium'>
          {isPhotographer ? chat.customer : chat.photographer}
        </h2>
      </div>
    </div>
  )
}
