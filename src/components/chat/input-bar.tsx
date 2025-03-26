'use client'

import { useRef } from 'react'

import { Chat } from '@/types/messages'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ChatInputBarProps {
  currentChat: Chat | null
  sendMessage: (message: string) => void
  receiverId: number
}

export default function ChatInputBar({
  currentChat,
  sendMessage,
  receiverId,
}: ChatInputBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (!currentChat || !inputRef.current) return

    const messageData = {
      receiverId: receiverId,
      content: inputRef.current.value,
      type: 'TEXT',
    }

    sendMessage(JSON.stringify(messageData))
    inputRef.current.value = ''
  }

  return (
    <div className='flex w-full items-center justify-between space-x-2.5 bg-white px-5 py-4'>
      <Input
        type='text'
        placeholder='Message'
        className='w-full rounded-md border-zinc-200 bg-white px-3 py-2'
        ref={inputRef}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      />
      <Button onClick={handleClick}>Send</Button>
    </div>
  )
}
