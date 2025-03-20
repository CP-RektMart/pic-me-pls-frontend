'use client'

import { useState } from 'react'

import { getChats } from '@/actions/chat/get-chat'
import { Chat } from '@/actions/chat/get-chat'
import ProfilePic from '@public/images/profile-mock-image.png'

import ChatList from '@/components/chat/chat-list'
import ChatSection from '@/components/chat/chat-section'
import ProfileSidebar from '@/components/chat/profile-sidebar'

export default function ChatPage() {
  const userRole = 'photographer'
  const isPhotographer = userRole === 'photographer'
  const chats = getChats()

  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)

  return (
    <div className='flex w-full flex-row'>
      <ChatList
        isPhotographer={isPhotographer}
        chats={chats}
        setSelectedChat={setSelectedChat}
        selectedChat={selectedChat}
      />
      <ChatSection
        chat={selectedChat}
        userRole={userRole}
        setSelectedChat={setSelectedChat}
      />
      <ProfileSidebar
        isPhotographer={isPhotographer}
        opponentName={selectedChat?.customer || null}
        opponentProfilePic={ProfilePic.src}
      />
    </div>
  )
}
