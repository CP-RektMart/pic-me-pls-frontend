'use client'

import { useState } from 'react'

import { getChats } from '@/actions/chat/get-chat'
import { Chat } from '@/actions/chat/get-chat'

import ViewChats from '@/components/chat/view-chats'

export default function ChatPage() {
  const isPhotographer = true
  const chats = getChats()

  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)

  return (
    <div className='w-full'>
      <ViewChats
        isPhotographer={isPhotographer}
        chats={chats}
        setSelectedChat={setSelectedChat}
        selectedChat={selectedChat}
      />
    </div>
  )
}
