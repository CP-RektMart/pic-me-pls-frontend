import { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'
import { Chat } from '@/types/messages'
import { User, UserRole } from '@/types/user'

import ChatMessage from './chat-message'
import ChatTopBar from './chat-topbar'
import ChatInputBar from './input-bar'

interface ChatSectionProps {
  user: User
  chat: Chat | null
  setSelectedChat: (chat: Chat | null) => void
  sendMessage: (message: string) => void
}

export default function ChatSection({
  user,
  chat,
  setSelectedChat,
  sendMessage,
}: ChatSectionProps) {
  const chatRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [chat?.messages])

  return (
    <div className={cn(chat ? 'flex flex-1 flex-col bg-slate-100' : 'hidden')}>
      {/* mobile component only */}
      {/* not done */}
      <ChatTopBar
        role={user.role as UserRole}
        opponentId={chat?.user.id || 0}
        opponentName={chat?.user.name || 'Unknown'}
        opponentRole={chat?.user.role as UserRole}
        opponentProfilePic={chat?.user.profilePictureUrl || ''}
        setSelectedChat={setSelectedChat}
      />

      <div
        className='flex h-full flex-col gap-2.5 overflow-y-auto px-5 py-4'
        ref={chatRef}
      >
        {chat?.messages.map((message, index) => (
          <ChatMessage
            key={index}
            profilePictureUrl={chat.user.profilePictureUrl || ''}
            message={message}
            userId={chat.user.id || 0}
          />
        ))}
      </div>

      <ChatInputBar
        currentChat={chat}
        sendMessage={sendMessage}
        receiverId={chat?.user.id || 0}
      />
    </div>
  )
}
