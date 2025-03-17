'use client'

import { useRef } from 'react'

import { Chat } from '@/actions/chat/get-chat'
import { postChat } from '@/actions/chat/post-chat'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface ChatInputBarProps {
  currentChat: Chat | null
  userRole: 'photographer' | 'customer'
  setSelectedChat: (chat: Chat | null) => void
}

export default function ChatInputBar({
  currentChat,
  userRole,
  setSelectedChat,
}: ChatInputBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (!currentChat) return

    if (inputRef.current) {
      console.log(inputRef.current.value)
      postChat(currentChat.id, inputRef.current.value, userRole)
      setSelectedChat({
        ...currentChat,
        conversation: [...currentChat.conversation],
      })
      inputRef.current.value = ''
    }
  }

  return (
    <div className='flex w-full items-center justify-between space-x-2.5 bg-white px-5 py-4'>
      <Input
        type='text'
        placeholder='Aa'
        className='w-full rounded-md border-zinc-200 bg-white px-3 py-2'
        ref={inputRef}
      />
      <Button onClick={handleClick}>Send</Button>
    </div>
  )
}
