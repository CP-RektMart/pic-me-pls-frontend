import { cn } from '@/lib/utils'
import { Chat } from '@/types/messages'

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
        'flex w-full flex-col shadow-md lg:w-1/4 lg:max-w-sm'
        // selectedChat && 'hidden lg:block'
      )}
    >
      <h1 className='px-5 py-4 text-xl font-bold shadow-sm'>Chats</h1>

      <div className='h-full space-y-2 overflow-y-auto px-5 py-4'>
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
