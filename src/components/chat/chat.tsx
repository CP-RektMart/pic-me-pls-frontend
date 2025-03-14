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
      <div className='flex flex-col overflow-y-auto'>
        {chat?.conversation.map((message, index) => {
          return (
            <div
              key={index}
              className={`${
                message.sender === userRole ? 'self-end' : 'self-start'
              }`}
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
    </div>
  )
}
