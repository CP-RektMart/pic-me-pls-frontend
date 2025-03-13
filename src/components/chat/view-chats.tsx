import { getChats } from '@/actions/chat/get-chat'
import ProfilePic from '@public/images/profile-mock-image.png'
import Image from 'next/image'

export default function ViewChats() {
  const chats = getChats()

  const isPhotographer = true

  return (
    <div className='w-full space-y-4 px-5 py-4 lg:w-1/4'>
      <h1 className='text-xl font-bold'>Chats</h1>

      <div className='space-y-2'>
        {chats.map((chat) => (
          <div key={chat.id} className='p-2'>
            <div className='grid grid-cols-5 space-x-3'>
              <Image
                className='h-12 w-12 rounded-full'
                src={ProfilePic}
                alt='Profile photo'
                width={48}
                height={48}
              />
              <div className='col-span-4 flex flex-col'>
                <h2 className='text-base font-medium'>
                  {isPhotographer ? chat.customer : chat.photographer}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
