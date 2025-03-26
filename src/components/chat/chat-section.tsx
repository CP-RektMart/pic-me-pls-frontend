import { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'
import { Chat } from '@/types/messages'
import { UserRole } from '@/types/user'

import ChatMessage from './chat-message'
import ChatTopBar from './chat-topbar'
import ChatInputBar from './input-bar'

interface ChatSectionProps {
  chat: Chat | null
  setSelectedChat: (chat: Chat | null) => void
  sendMessage: (message: string) => void
}

export default function ChatSection({
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
    <div
      className={cn(
        chat ? 'flex w-full flex-col bg-slate-100 lg:w-1/2' : 'hidden'
      )}
    >
      {/* mobile component only */}
      {/* not done */}
      <ChatTopBar
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
