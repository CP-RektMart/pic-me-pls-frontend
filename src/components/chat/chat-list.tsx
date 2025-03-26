import { Chat } from '@/actions/chat/get-chat'
import { cn } from '@/lib/utils'
import ProfilePic from '@public/images/profile-mock-image.png'

import { BackButton } from '../back-button'
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
        'flex w-full flex-col gap-4 px-5 py-4 shadow-md lg:w-1/4 lg:max-w-sm',
        selectedChat && `hidden lg:block`
      )}
    >
      <div className='flex flex-row items-center gap-4'>
        <BackButton />
        <h1 className='text-xl font-bold'>Chats</h1>
      </div>

      <div className='h-full space-y-2 overflow-y-auto'>
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
