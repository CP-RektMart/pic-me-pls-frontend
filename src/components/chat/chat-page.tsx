'use client'

import { useEffect, useState } from 'react'

import { getPhotographer } from '@/actions/photographers/get-photographer'
// import { getMessages } from '@/actions/chat/get-chat'
// import { getChats } from '@/actions/chat/get-chat'
import { Chat } from '@/types/messages'
// import { Chat, Message } from '@/types/messages'
import { UserRole } from '@/types/user'
import { useSearchParams } from 'next/navigation'
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
  const searchParams = useSearchParams()
  const photographerId = parseInt(searchParams.get('photographerId') || '0')

  // const chats = getChats()

  // const [chats, setChats] = useState<Chat[]>([])
  const [chats, setChats] = useState(messages)
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
    const fetchAndSetChat = async () => {
      if (photographerId) {
        const existingChat = chats.find(
          (chat) => chat.user.id === photographerId
        )
        if (existingChat) {
          // If an existing chat with photographerId is found, set it as selected
          setSelectedChat(existingChat)
        } else {
          // If no existing chat with photographerId, create new chat
          try {
            const photographer = await getPhotographer(photographerId)
            if (photographer) {
              const newChat: Chat = {
                user: {
                  id: photographerId,
                  name: photographer.name || '',
                  profilePictureUrl: photographer.profilePictureUrl || '',
                  role: 'PHOTOGRAPHER',
                },
                messages: [],
              }
              setSelectedChat(newChat)
              setChats((prevChats) => [...prevChats, newChat])
            }
          } catch (error) {
            console.error('Failed to fetch photographer:', error)
          }
        }
      } else {
        // If no photographerId, set selectedChat to null
        setSelectedChat(null)
      }
    }

    fetchAndSetChat()
  }, [photographerId])

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
        opponentId={selectedChat?.user.id || 0}
      />
    </div>
  )
}
