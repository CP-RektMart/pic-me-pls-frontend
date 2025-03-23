import { Icon } from '@iconify/react'
import Image from 'next/image'

import { Badge } from '@/components/ui/badge'

interface ProfileThumbnailProps {
  profilePictureUrl: string
  name: string
  haveVerifiedBadge: boolean
}

export function ProfileThumbnail({
  profilePictureUrl,
  name,
  haveVerifiedBadge,
}: ProfileThumbnailProps) {
  return (
    <div className='flex items-center gap-2'>
      <Image
        src={profilePictureUrl || '/default.jpg'}
        alt={name || 'profile'}
        className='size-12 rounded-full object-cover'
        width={32}
        height={32}
      />
      <div className='flex flex-col items-center gap-2'>
        <h3 className='flex items-center gap-2 text-lg font-bold'>
          {name || 'Name'}
          {haveVerifiedBadge && (
            <Badge
              variant='secondary'
              className='gap-1 bg-green-100 text-green-700'
            >
              <Icon icon='lucide:verified' />
              Verified
            </Badge>
          )}
        </h3>
      </div>
    </div>
  )
}
