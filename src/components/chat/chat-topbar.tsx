import Image from 'next/image'

import { Badge } from '../ui/badge'

interface ChatTopBarProps {
  opponentName: string | null
  opponentRole: 'photographer' | 'customer'
  opponentProfilePic: string
}

export default function ChatTopBar({
  opponentName,
  opponentRole,
  opponentProfilePic,
}: ChatTopBarProps) {
  return (
    <div className='flex flex-row items-center justify-between bg-white px-5 py-2.5 lg:hidden'>
      <div className='flex flex-row items-center space-x-3'>
        <Image
          className='rounded-full'
          src={opponentProfilePic}
          alt='Profile photo'
          width={48}
          height={48}
        />
        <div className='flex flex-col space-y-2'>
          <h2 className='text-base font-medium'>{opponentName}</h2>
          <Badge
            className={`w-20 ${opponentRole === 'customer' ? `bg-orange-100 text-base-primary` : `bg-blue-100 text-blue-700`} shadow-none`}
          >
            {opponentRole === 'customer' ? 'Customer' : 'Photographer'}
          </Badge>
        </div>
      </div>
    </div>
  )
}
