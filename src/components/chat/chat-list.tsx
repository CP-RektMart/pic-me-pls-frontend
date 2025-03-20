import { Chat } from '@/actions/chat/get-chat'
import { cn } from '@/lib/utils'
import ProfilePic from '@public/images/profile-mock-image.png'

import ChatCard from './chat-card'

interface ChatListProps {
  isPhotographer: boolean
  chats: Chat[]
  setSelectedChat: (chat: Chat) => void
  selectedChat?: Chat | null
}

export default function ChatList({
  isPhotographer,
  chats,
  setSelectedChat,
  selectedChat,
}: ChatListProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col shadow-md lg:w-1/4 lg:max-w-sm',
        selectedChat && `hidden lg:block`
      )}
    >
      <h1 className='px-5 py-4 text-xl font-bold shadow-sm'>Chats</h1>

      <div className='h-full space-y-2 overflow-y-auto px-5 py-4'>
        {chats.map((chat) => (
          <ChatCard
            key={chat.id}
            chat={chat}
            isPhotographer={isPhotographer}
            profilePic={ProfilePic.src}
            isSelected={selectedChat?.id === chat.id}
            setSelectedChat={setSelectedChat}
          />
        ))}
      </div>
    </div>
  )
}
