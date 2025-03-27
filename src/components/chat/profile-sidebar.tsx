import { cn } from '@/lib/utils'
import { UserRole } from '@/types/user'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export interface ProfileSidebarProps {
  role: UserRole
  opponentRole: UserRole
  opponentName: string | null
  opponentId: number
  opponentProfilePic: string
}

export default function ProfileSidebar({
  role,
  opponentName,
  opponentRole,
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
      <div className='flex w-full flex-col items-center space-y-2'>
        {opponentProfilePic && (
          <Image
            className='rounded-full object-cover'
            src={opponentProfilePic}
            alt='Profile photo'
            width={112}
            height={112}
          />
        )}
        {opponentRole && (
          <Badge
            variant={
              opponentRole.toLowerCase() as
                | 'default'
                | 'destructive'
                | 'outline'
                | 'secondary'
                | 'photographer'
                | 'customer'
                | null
                | undefined
            }
          >
            {opponentRole[0]?.toUpperCase() + opponentRole.slice(1)}
          </Badge>
        )}
      </div>
      <h2 className='w-full text-center font-bold'>{opponentName}</h2>
      {role == 'PHOTOGRAPHER' && (
        <Button variant='secondary' onClick={handleCreateQuotation}>
          <Icon icon='lucide:clipboard-plus' className='size-5' />
          Create Quotation
        </Button>
      )}
    </div>
  )
}
