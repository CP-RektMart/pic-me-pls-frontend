'use client'

import { useEffect, useState } from 'react'

// import { getMessages } from '@/actions/chat/get-chat'
// import { getChats } from '@/actions/chat/get-chat'
import { Chat, Message } from '@/types/messages'
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

  const splitFirstSpace = (text: string): string[] => {
    const parts = text.split(' ')
    if (parts.length < 2) return parts // No space found
    return [parts[0] as string, parts.slice(1).join(' ')]
  }

  const convertMessage = (raw: string): Message | null => {
    const [event, message] = splitFirstSpace(raw)
    if (event == 'MESSAGE' && !!message) {
      return JSON.parse(message)
    } else {
      console.error('message error', message)
    }
    return null
  }

  useEffect(() => {
    if (!lastMessage) {
      return
    }

    const message = convertMessage(String(lastMessage.data))
    const talkerId =
      message?.senderId == userId ? message.receiverId : message?.senderId
    const idx = chats.findIndex((chats) => chats.user.id == talkerId)

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
        role={selectedChat?.user.role?.toLowerCase() as UserRole}
        opponentName={selectedChat?.user.name || null}
        opponentProfilePic={selectedChat?.user.profilePictureUrl || ''}
        opponentId={selectedChat?.user.id || 0}
      />
    </div>
  )
}
