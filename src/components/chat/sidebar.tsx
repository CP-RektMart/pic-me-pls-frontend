import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react'
import Image from 'next/image'

import { Badge } from '@/components/ui/badge'

export interface SidebarProfileProps {
  isPhotographer: boolean
  opponentName: string | null
  opponentProfilePic: string
}

export default function SidebarProfile({
  isPhotographer,
  opponentName,
  opponentProfilePic,
}: SidebarProfileProps) {
  return (
    <div
      className={cn(
        'hidden space-x-3 space-y-4 px-5 py-4 shadow-md lg:flex lg:w-1/4 lg:flex-col',
        opponentName === null ? 'lg:hidden' : ''
      )}
    >
      <h1 className='text-xl font-bold'>
        Your {isPhotographer ? 'Customer' : 'Photographer'}
      </h1>
      <div className='flex w-full flex-col items-center space-y-2'>
        <Image
          className='rounded-full'
          src={opponentProfilePic}
          alt='Profile photo'
          width={112}
          height={112}
        />
        <Badge className='w-20 bg-orange-100 text-base-primary shadow-none'>
          {isPhotographer ? 'Customer' : 'Photographer'}
        </Badge>
      </div>
      <h2 className='w-full text-center font-bold'>{opponentName}</h2>
      <div
        className='flex max-h-10 cursor-pointer flex-row items-center justify-center gap-x-2 rounded-lg bg-zinc-50 py-2'
        onClick={() => console.log('Create Quotation')}
      >
        <Icon icon='lucide:clipboard-plus' className='size-5' />
        Create Quotation
      </div>
    </div>
  )
}
