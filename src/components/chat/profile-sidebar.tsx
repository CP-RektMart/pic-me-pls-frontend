import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export interface ProfileSidebarProps {
  isPhotographer: boolean
  opponentName: string | null
  opponentId: number
  opponentProfilePic: string
}

export default function ProfileSidebar({
  isPhotographer,
  opponentName,
  opponentProfilePic,
  opponentId,
}: ProfileSidebarProps) {
  const router = useRouter()

  const handleCreateQuotation = () => {
    router.push(`/photographer/quotations?create=1&id=${opponentId}`)
  }

  return (
    <div
      className={cn(
        'hidden max-w-sm space-x-3 space-y-4 px-5 py-4 shadow-md lg:flex lg:w-1/4 lg:flex-col',
        !opponentName && 'lg:hidden'
      )}
    >
      <h1 className='text-xl font-bold'>
        Your {isPhotographer ? 'Customer' : 'Photographer'}
      </h1>
      <div className='flex w-full flex-col items-center space-y-2'>
        <Image
          className='rounded-full object-cover'
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
      {isPhotographer && (
        <Button variant='secondary' onClick={handleCreateQuotation}>
          <Icon icon='lucide:clipboard-plus' className='size-5' />
          Create Quotation
        </Button>
      )}
    </div>
  )
}
