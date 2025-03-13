import { getChats } from '@/actions/chat/get-chat'
import ProfilePic from '@public/images/profile-mock-image.png'

import ChatCard from './chat-card'

export default function ViewChats() {
  const chats = getChats()

  const isPhotographer = true

  return (
    <div className='w-full space-y-4 px-5 py-4 lg:w-1/4'>
      <h1 className='text-xl font-bold'>Chats</h1>

      <div className='space-y-2'>
        {chats.map((chat) => (
          <div key={chat.id} className='p-2'>
            <ChatCard
              chat={chat}
              isPhotographer={isPhotographer}
              profilePic={ProfilePic.src}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
