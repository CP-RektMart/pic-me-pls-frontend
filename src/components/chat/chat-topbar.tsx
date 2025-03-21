import { Chat } from '@/actions/chat/get-chat'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react'
import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface ChatTopBarProps {
  opponentName: string | null
  opponentRole: 'photographer' | 'customer'
  opponentProfilePic: string
  setSelectedChat: (chat: Chat | null) => void
}

export default function ChatTopBar({
  opponentName,
  opponentRole,
  opponentProfilePic,
  setSelectedChat,
}: ChatTopBarProps) {
  return (
    <div className='flex w-full flex-row items-center justify-between bg-white px-5 py-2.5 lg:hidden'>
      <div className='flex flex-row items-center space-x-3'>
        <Icon
          icon='lucide:chevron-left'
          className='size-5'
          onClick={() => setSelectedChat(null)}
        />

        <Image
          className='rounded-full object-cover'
          src={opponentProfilePic}
          alt='Profile photo'
          width={48}
          height={48}
        />

        <div className='flex flex-col space-y-2'>
          <h2 className='text-base font-medium'>{opponentName}</h2>
          <Badge
            className={cn(
              'w-20 shadow-none',
              opponentRole === 'customer'
                ? 'bg-orange-100 text-base-primary'
                : 'bg-blue-100 text-blue-700'
            )}
          >
            {opponentRole === 'customer' ? 'Customer' : 'Photographer'}
          </Badge>
        </div>
      </div>

      <Button
        variant='secondary'
        onClick={() => console.log('Create Quotation')}
      >
        <Icon icon='lucide:clipboard-plus' className='size-4 text-black' />
      </Button>
    </div>
  )
}
