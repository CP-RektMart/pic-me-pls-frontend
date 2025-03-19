import { Chat } from '@/actions/chat/get-chat'
import { cn } from '@/lib/utils'
import ProfilePic from '@public/images/profile-mock-image.png'

import ChatMessage from './chat-message'
import ChatTopBar from './chat-topbar'
import ChatInputBar from './input-bar'

interface ChatTabProps {
  chat: Chat | null
  userRole: 'photographer' | 'customer'
  setSelectedChat: (chat: Chat | null) => void
}

export default function ChatTab({
  chat,
  userRole,
  setSelectedChat,
}: ChatTabProps) {
  const opponentRole = userRole === 'photographer' ? 'customer' : 'photographer'
  const opponentName = chat?.[opponentRole] ?? null

  return (
    <div
      className={cn(
        chat
          ? 'w-full flex-col space-y-2.5 bg-slate-100 lg:flex lg:w-1/2'
          : 'hidden',
        'h-screen lg:h-full'
      )}
    >
      <ChatTopBar
        opponentName={opponentName}
        opponentRole={opponentRole}
        opponentProfilePic={ProfilePic.src}
        setSelectedChat={setSelectedChat}
      />

      <div className='flex h-full flex-col overflow-y-auto px-5 lg:py-4'>
        {chat?.conversation.map((message, index) => {
          return (
            <div key={index} className='w-full'>
              <ChatMessage message={message} userRole={userRole} />
            </div>
          )
        })}
      </div>

      <ChatInputBar
        currentChat={chat}
        userRole={userRole}
        setSelectedChat={setSelectedChat}
      />
    </div>
  )
}
