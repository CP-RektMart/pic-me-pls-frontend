import { cn } from '@/lib/utils'
import { Chat } from '@/types/messages'

import ChatMessage from './chat-message'
import ChatTopBar from './chat-topbar'
import ChatInputBar from './input-bar'

interface ChatSectionProps {
  chat: Chat | null
  setSelectedChat: (chat: Chat | null) => void
  sendMessage: (message: string) => void
  userId: number
}

export default function ChatSection({
  chat,
  setSelectedChat,
  sendMessage,
  userId,
}: ChatSectionProps) {
  return (
    <div
      className={cn(
        chat ? 'flex w-full flex-col bg-slate-100 lg:w-1/2' : 'hidden'
      )}
    >
      {/* mobile component only */}
      {/* not done */}
      <ChatTopBar
        opponentName={chat?.user.name || 'Unknown'}
        opponentRole={chat?.user.role?.toLowerCase() || ''}
        opponentProfilePic={chat?.user.profilePictureUrl || ''}
        setSelectedChat={setSelectedChat}
      />

      <div className='flex h-full flex-col gap-2.5 overflow-y-auto px-5 py-4'>
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
        senderId={userId}
        receiverId={chat?.user.id || 0}
      />
    </div>
  )
}
