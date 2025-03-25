'use client'

import { useState } from 'react'

import { getChats } from '@/actions/chat/get-chat'
import { Chat } from '@/actions/chat/get-chat'
import ProfilePic from '@public/images/profile-mock-image.png'
import useWebSocket from 'react-use-websocket'

import ChatList from '@/components/chat/chat-list'
import ChatSection from '@/components/chat/chat-section'
import ProfileSidebar from '@/components/chat/profile-sidebar'

interface Props {
  accessToken: string
}

export default function ChatPage({ accessToken }: Props) {
  const userRole = 'photographer'
  const isPhotographer = userRole === 'photographer'
  const chats = getChats()

  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const { lastMessage } = useWebSocket(
    'ws://localhost:8000/api/v1/messages/ws',
    {
      protocols: ['Authorization', `Bearer ${accessToken}`],
    }
  )

  // useEffect(() => {
  //   socket.on('connect', () => {
  //     console.log('Connected to WebSocket server')
  //   })

  //   socket.on('message', (data) => {
  //     console.log('Received message:', data)
  //     setMessages((prev) => [...prev, data])
  //   })

  //   return () => {
  //     socket.disconnect()
  //   }
  // }, [])

  return (
    <div className='flex h-[calc(100vh-7.5rem)] w-full overflow-hidden'>
      {JSON.stringify(lastMessage)}
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
