import { Chat } from '@/actions/chat/get-chat'

import ChatMessage from './chat-message'

interface ChatTabProps {
  chat: Chat | null
  userRole: 'photographer' | 'customer'
}

export default function ChatTab({ chat, userRole }: ChatTabProps) {
  return (
    <div
      className={`hidden w-1/2 flex-col space-y-2.5 bg-slate-100 px-5 py-4 lg:flex ${chat ? 'block' : 'lg:hidden'}`}
    >
      {chat?.conversation.map((message, index) => {
        return (
          <div
            key={index}
            className='space-x-2.5 rounded-2xl bg-white px-3 py-2'
          >
            <ChatMessage
              message={message.message}
              sender={message.sender}
              userRole={userRole}
            />
          </div>
        )
      })}
    </div>
  )
}
