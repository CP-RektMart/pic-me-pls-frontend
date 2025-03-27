import { cn } from '@/lib/utils'
import { Chat } from '@/types/messages'

import { BackButton } from '../back-button'
import ChatCard from './chat-card'

interface ChatListProps {
  chats: Chat[]
  setSelectedChat: (chat: Chat) => void
  selectedChat?: Chat | null
}

export default function ChatList({
  chats,
  setSelectedChat,
  selectedChat,
}: ChatListProps) {
  return (
    <div
      className={cn(
        'flex w-72 flex-initial flex-col gap-4 bg-white px-5 py-4 drop-shadow-lg'
      )}
    >
      <div className='flex flex-row items-center gap-4'>
        <BackButton />
        <h1 className='text-xl font-bold'>Chats</h1>
      </div>

      <div className='h-full space-y-2 overflow-y-auto'>
        {chats.map((chat, idx) => (
          <ChatCard
            key={idx}
            chat={chat}
            name={chat.user.name || 'Unknown'}
            profilePic={chat.user.profilePictureUrl || ''}
            isSelected={selectedChat === chat} // wtf
            setSelectedChat={setSelectedChat}
          />
        ))}
      </div>
    </div>
  )
}
