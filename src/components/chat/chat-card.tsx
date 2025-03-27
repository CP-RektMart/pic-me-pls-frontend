import { cn } from '@/lib/utils'
import { Chat } from '@/types/messages'
import Image from 'next/image'

interface ChatCardProps {
  chat: Chat
  name: string
  profilePic: string
  isSelected: boolean
  setSelectedChat: (chat: Chat) => void
}

export default function ChatCard({
  chat,
  name,
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
      <div className='flex flex-col overflow-hidden'>
        <h2 className='truncate font-medium'>{name}</h2>
        {chat.messages.length > 0 && (
          <p className='truncate text-xs font-medium text-gray-500'>
            {chat?.messages[chat.messages.length - 1]?.content}
          </p>
        )}
      </div>
    </div>
  )
}
