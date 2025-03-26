'use client'

import { useEffect, useState } from 'react'

// import { getMessages } from '@/actions/chat/get-chat'
// import { getChats } from '@/actions/chat/get-chat'
import { Chat } from '@/types/messages'
// import { Chat, Message } from '@/types/messages'
import { UserRole } from '@/types/user'
import useWebSocket from 'react-use-websocket'

import ChatList from '@/components/chat/chat-list'
import ChatSection from '@/components/chat/chat-section'
import ProfileSidebar from '@/components/chat/profile-sidebar'

interface Props {
  accessToken: string
  messages: Chat[]
  userId: number
}

export default function ChatPage({ accessToken, messages, userId }: Props) {
  // const chats = getChats()

  // const [chats, setChats] = useState<Chat[]>([])
  const [chats] = useState(messages)
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)

  const { sendMessage, lastMessage } = useWebSocket(
    `ws://localhost:8000/api/v1/messages/ws?accessToken=${accessToken}`,
    {
      onOpen: () => console.log('open'),
      onError: (event) => console.log('error', event),
      onClose: () => console.log('close'),
    }
  )

  useEffect(() => {
    console.log('lastMessage', lastMessage)
    console.log('selectedChat', selectedChat)
    console.log('chats', chats)
  }, [lastMessage, selectedChat, chats])

  return (
    <div className='flex h-[calc(100vh-7.5rem)] w-full overflow-hidden'>
      <ChatList
        chats={chats}
        setSelectedChat={setSelectedChat}
        selectedChat={selectedChat}
      />
      <ChatSection
        chat={selectedChat}
        setSelectedChat={setSelectedChat}
        sendMessage={sendMessage}
        userId={userId}
      />
      <ProfileSidebar
        role={selectedChat?.user.role?.toLowerCase() as UserRole}
        opponentName={selectedChat?.user.name || null}
        opponentProfilePic={selectedChat?.user.profilePictureUrl || ''}
      />
    </div>
  )
}
