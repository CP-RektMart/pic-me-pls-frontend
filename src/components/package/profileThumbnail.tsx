import FallBackImage from '@public/images/fallBackProfileImage.png'
import Image from 'next/image'

import { VerifyBadge } from '../ui/verify-badge'

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
      <div>
        <div className='relative size-12'>
          <Image
            src={profilePictureUrl || FallBackImage}
            alt={name || 'profile'}
            className='rounded-full object-cover'
            fill
          />
        </div>
      </div>

      <div className='flex flex-col items-center gap-2'>
        <h3 className='flex items-center gap-2 text-lg font-bold'>
          {name || 'Name'}
          <VerifyBadge isVerified={haveVerifiedBadge} />
        </h3>
      </div>
    </div>
  )
}
