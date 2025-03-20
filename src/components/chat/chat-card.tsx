import { Chat } from '@/actions/chat/get-chat'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface ChatCardProps {
  chat: Chat
  isPhotographer: boolean
  profilePic: string
  isSelected: boolean
  setSelectedChat: (chat: Chat) => void
}

export default function ChatCard({
  chat,
  isPhotographer,
  profilePic,
  isSelected,
  setSelectedChat,
}: ChatCardProps) {
  return (
    <div
      className={cn(
        'flex flex-row space-x-3 rounded-xl p-2',
        isSelected && 'bg-slate-100'
      )}
      onClick={() => setSelectedChat(chat)}
    >
      <Image
        className='rounded-full object-cover'
        src={profilePic}
        alt='Profile photo'
        width={48}
        height={48}
      />
      <div className='col-span-4 flex w-full flex-col overflow-hidden'>
        <h2 className='truncate text-base font-medium'>
          {isPhotographer ? chat.customer : chat.photographer}
        </h2>
        {chat.conversation.length > 0 && (
          <p className='truncate text-xs font-medium text-gray-500'>
            {chat.conversation?.[chat.conversation.length - 1]?.message}
          </p>
        )}
      </div>
    </div>
  )
}
