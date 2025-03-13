import { getChats } from '@/actions/chat/get-chat'
import ProfilePic from '@public/images/profile-mock-image.png'
import Image from 'next/image'

export default function ViewChats() {
  const chats = getChats()

  const isPhotographer = true

  return (
    <div className='px-5 py-4'>
      <h1 className='text-xl font-bold'>Chats</h1>

      <div className='mt-4'>
        {chats.map((chat) => (
          <div key={chat.id} className='border-b border-gray-200 py-4'>
            <Image
              className='h-12 w-12 rounded-full'
              src={ProfilePic}
              alt='Profile photo'
              width={48}
              height={48}
            />
            <h2 className='text-lg font-bold'>
              {isPhotographer ? chat.customer : chat.photographer}
            </h2>

            <div className='mt-4'>
              {chat.conversation.map((message) => (
                <div key={message.id} className='mb-2'>
                  <p className='font-bold'>{message.sender}</p>
                  <p>{message.message}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
