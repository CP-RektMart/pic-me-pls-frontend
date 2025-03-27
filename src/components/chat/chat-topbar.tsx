import { cn } from '@/lib/utils'
import { Chat } from '@/types/messages'
import { UserRole } from '@/types/user'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface ChatTopBarProps {
  role: UserRole
  opponentName: string | null
  opponentRole: UserRole
  opponentProfilePic: string
  opponentId: number
  setSelectedChat: (chat: Chat | null) => void
}

export default function ChatTopBar({
  role,
  opponentName,
  opponentRole,
  opponentProfilePic,
  opponentId,
  setSelectedChat,
}: ChatTopBarProps) {
  const router = useRouter()

  const handleCreateQuotation = () => {
    router.push(`/photographer/quotations?create=1&id=${opponentId}`)
  }

  return (
    <div className='flex w-full flex-row items-center justify-between bg-white px-5 py-2.5 lg:hidden'>
      <div className='flex flex-row items-center space-x-3'>
        <Icon
          icon='lucide:chevron-left'
          className='size-5 md:hidden'
          onClick={() => setSelectedChat(null)}
        />

        {opponentProfilePic && (
          <div className='relative size-12'>
            <Image
              className='rounded-full object-cover'
              src={opponentProfilePic}
              alt='Profile photo'
              fill
            />
          </div>
        )}

        <div className='flex flex-col'>
          <h2 className='text-base font-medium'>{opponentName}</h2>
          <Badge
            className={cn(
              'w-fit shadow-none',
              opponentRole === 'CUSTOMER'
                ? 'bg-orange-100 text-base-primary'
                : 'bg-blue-100 text-blue-700'
            )}
          >
            {opponentRole === 'CUSTOMER' ? 'Customer' : 'Photographer'}
          </Badge>
        </div>
      </div>

      {role === 'PHOTOGRAPHER' && (
        <Button variant='secondary' onClick={handleCreateQuotation}>
          <Icon icon='lucide:clipboard-plus' className='size-4 text-black' />
        </Button>
      )}
    </div>
  )
}
