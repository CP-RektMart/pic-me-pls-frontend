import { Chat } from '@/actions/chat/get-chat'
import ProfilePic from '@public/images/profile-mock-image.png'

import ChatCard from './chat-card'

interface ViewChatsProps {
  isPhotographer: boolean
  chats: Chat[]
  setSelectedChat: (chat: Chat) => void
  selectedChat?: Chat | null
}

export default function ViewChats({
  isPhotographer,
  chats,
  setSelectedChat,
  selectedChat,
}: ViewChatsProps) {
  return (
    <div className='min-h-full w-full space-y-4 px-5 py-4 lg:w-1/4'>
      <h1 className='text-xl font-bold'>Chats</h1>

      <div className='space-y-2'>
        {chats.map((chat) => (
          <div
            key={chat.id}
            className='p-2'
            onClick={() => setSelectedChat(chat)}
          >
            <ChatCard
              chat={chat}
              isPhotographer={isPhotographer}
              profilePic={ProfilePic.src}
              isSelected={selectedChat?.id === chat.id}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
