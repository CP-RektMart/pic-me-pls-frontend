import { Chat } from '@/actions/chat/get-chat'
import Image from 'next/image'

interface ChatCardProps {
  chat: Chat
  isPhotographer: boolean
  profilePic: string
  isSelected: boolean
}

export default function ChatCard({
  chat,
  isPhotographer,
  profilePic,
  isSelected,
}: ChatCardProps) {
  return (
    <div
      className={`${isSelected ? 'bg-slate-100' : ''} grid grid-cols-5 space-x-3 rounded-xl p-2`}
    >
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
        {chat.conversation.length > 0 && (
          <p className='text-xs font-medium text-gray-500'>
            {chat.conversation?.[chat.conversation.length - 1]?.message}
          </p>
        )}
      </div>
    </div>
  )
}
