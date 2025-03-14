'use client'

import { useState } from 'react'

import { getChats } from '@/actions/chat/get-chat'
import { Chat } from '@/actions/chat/get-chat'
import ProfilePic from '@public/images/profile-mock-image.png'

import SidebarProfile from '@/components/chat/sidebar'
import ViewChats from '@/components/chat/view-chats'

export default function ChatPage() {
  const isPhotographer = true
  const chats = getChats()

  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)

  return (
    <div className='flex w-full flex-row'>
      <ViewChats
        isPhotographer={isPhotographer}
        chats={chats}
        setSelectedChat={setSelectedChat}
        selectedChat={selectedChat}
      />
      <SidebarProfile
        isPhotographer={isPhotographer}
        opponentName={selectedChat?.customer || null}
        opponentProfilePic={ProfilePic.src}
      />
    </div>
  )
}
