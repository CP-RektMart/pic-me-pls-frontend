import { Chat } from '@/actions/chat/get-chat'
import { cn } from '@/lib/utils'
import ProfilePic from '@public/images/profile-mock-image.png'

import ChatMessage from './chat-message'
import ChatTopBar from './chat-topbar'
import ChatInputBar from './input-bar'

interface ChatSectionProps {
  chat: Chat | null
  userRole: 'photographer' | 'customer'
  setSelectedChat: (chat: Chat | null) => void
}

export default function ChatSection({
  chat,
  userRole,
  setSelectedChat,
}: ChatSectionProps) {
  const opponentRole = userRole === 'photographer' ? 'customer' : 'photographer'
  const opponentName = chat?.[opponentRole] ?? null

  return (
    <div
      className={cn(
        chat ? 'flex w-full flex-col bg-slate-100 lg:w-1/2' : 'hidden'
      )}
    >
      <ChatTopBar
        opponentName={opponentName}
        opponentRole={opponentRole}
        opponentProfilePic={ProfilePic.src}
        setSelectedChat={setSelectedChat}
      />

      <div className='flex h-full flex-col gap-2.5 overflow-y-auto px-5 py-4'>
        {chat?.conversation.map((message, index) => (
          <ChatMessage key={index} message={message} userRole={userRole} />
        ))}
      </div>

      <ChatInputBar
        currentChat={chat}
        userRole={userRole}
        setSelectedChat={setSelectedChat}
      />
    </div>
  )
}
