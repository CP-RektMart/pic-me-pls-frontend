'use client'

import { Chat } from '@/actions/chat/get-chat'
import { postImageMessage } from '@/actions/chat/post-chat'
import { postImageChatUpload } from '@/actions/chat/post-image-chat'
import { Icon } from '@iconify/react'

interface ChatInputImageBarProps {
  currentChat: Chat | null
  userRole: 'photographer' | 'customer'
  fileInputRef: React.RefObject<HTMLInputElement | null>
  flushInput: () => void
}

export default function ChatInputImageBar({
  currentChat,
  userRole,
  fileInputRef,
  flushInput,
}: ChatInputImageBarProps) {
  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault()
    if (!e.target.files || !e.target.files[0] || !currentChat) return

    const file = e.target.files[0]
    try {
      const { url: imageUrl } = await postImageChatUpload(file)

      await postImageMessage({
        chatId: currentChat.id,
        message: '[Image]',
        imageUrl,
        sender: userRole,
        type: 'image',
      })

      flushInput()
    } catch (err) {
      console.error('Image upload failed:', err)
    }
  }

  return (
    <div>
      <button
        type='button'
        onClick={handleButtonClick}
        className='flex justify-center'
      >
        <Icon icon='lucide:image' className='size-6 text-slate-500' />
      </button>
      <input
        type='file'
        accept='image/*'
        ref={fileInputRef}
        onChange={handleFileChange}
        name='fileInput'
        className='hidden'
      />
    </div>
  )
}
