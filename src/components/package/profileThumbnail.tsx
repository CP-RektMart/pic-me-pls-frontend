import { Icon } from '@iconify/react'
import Image from 'next/image'

import { Badge } from '../ui/badge'

interface ProfileThumbnailProps {
  profilePictureUrl: string
  name: string
  haveVerifiedBadge: boolean
  imageSize: number
}

export function ProfileThumbnail({
  profilePictureUrl,
  name,
  haveVerifiedBadge,
  imageSize,
}: ProfileThumbnailProps) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-2'>
        <Image
          src={profilePictureUrl || '/default.jpg'}
          alt={name || 'profile'}
          className='rounded-full object-cover'
          style={{ width: `${imageSize}px`, height: `${imageSize}px` }}
          width={50}
          height={50}
        />
        <div className='flex flex-col items-center gap-2'>
          <h3 className='flex items-center gap-2 text-lg font-bold'>
            {name || 'Name'}
            {haveVerifiedBadge ? (
              <Badge
                variant='secondary'
                className='gap-1 bg-green-100 text-green-700'
              >
                <Icon icon='lucide:verified' />
                Verified
              </Badge>
            ) : null}
          </h3>
        </div>
      </div>
    </div>
  )
}
