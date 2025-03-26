'use client'

import { useRef } from 'react'

import { Chat, Message } from '@/types/messages'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ChatInputBarProps {
  currentChat: Chat | null
  sendMessage: (message: string) => void
  senderId: number
  receiverId: number
}

export default function ChatInputBar({
  currentChat,
  sendMessage,
  senderId,
  receiverId,
}: ChatInputBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (!currentChat || !inputRef.current) return

    const messageData = {
      senderId: senderId,
      receiverId: receiverId,
      content: inputRef.current.value,
      type: 'TEXT',
    }
    console.log('messageData', messageData)
    sendMessage(JSON.stringify(messageData))
    currentChat.messages.push(messageData as Message)

    inputRef.current.value = ''
  }

  return (
    <div className='flex w-full items-center justify-between space-x-2.5 bg-white px-5 py-4'>
      <Input
        type='text'
        placeholder='Message'
        className='w-full rounded-md border-zinc-200 bg-white px-3 py-2'
        ref={inputRef}
      />
      <Button onClick={handleClick}>Send</Button>
    </div>
  )
}
