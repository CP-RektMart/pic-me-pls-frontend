'use client'

import { useEffect, useState } from 'react'

import { getPhotographer } from '@/actions/photographers/get-photographer'
import { envClientSchema } from '@/clientEnvSchema'
import { convertMessage } from '@/lib/utils'
import { Chat } from '@/types/messages'
import { User, UserRole } from '@/types/user'
import { useSearchParams } from 'next/navigation'
import useWebSocket from 'react-use-websocket'

import ChatList from '@/components/chat/chat-list'
import ChatSection from '@/components/chat/chat-section'
import ProfileSidebar from '@/components/chat/profile-sidebar'

interface Props {
  accessToken: string
  messages: Chat[]
  user: User
  userId: number
}

export default function ChatPage({
  accessToken,
  messages,
  user,
  userId,
}: Props) {
  const searchParams = useSearchParams()
  const photographerId = parseInt(searchParams.get('photographerId') || '0')
  const [chats, setChats] = useState(messages)
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)

  const { sendMessage, lastMessage } = useWebSocket(
    `${envClientSchema.NEXT_PUBLIC_WEBSOCKET_URL}/api/v1/messages/ws?accessToken=${accessToken}`,
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
    if (!lastMessage) {
      return
    }

    const message = convertMessage(String(lastMessage.data))
    const talkerId =
      message?.senderId == userId ? message?.receiverId : message?.senderId
    const idx = chats.findIndex((chat) => chat.user.id == talkerId)

    console.log('talkerId', talkerId)
    console.log('chats', chats)

    if (idx != -1 && !!message) {
      setChats((prev) => {
        const current = [...prev]
        const chat = current[idx]
        const isMessageExist =
          chat?.messages.findIndex((InMessage) => InMessage.id == message.id) !=
          -1
        if (!!chat && !isMessageExist) {
          chat.messages = [...chat.messages, message]
          current[idx] = chat
        }
        return current
      })
    }
  }, [lastMessage])

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
      />
      <ProfileSidebar
        opponentRole={selectedChat?.user.role as UserRole}
        role={user.role as UserRole}
        opponentName={selectedChat?.user.name || null}
        opponentProfilePic={selectedChat?.user.profilePictureUrl || ''}
        opponentId={selectedChat?.user.id || 0}
      />
    </div>
  )
}
