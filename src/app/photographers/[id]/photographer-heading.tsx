import Image from 'next/image'

import { Badge } from '@/components/ui/badge'

export default function PhotographerHeading({
  userName,
  userProfilePictureUrl,
  packageNums,
}: {
  userName: string | undefined
  userProfilePictureUrl: string | undefined
  packageNums?: number
}) {
  return (
    <div className='flex w-fit items-center gap-6'>
      {userProfilePictureUrl ? (
        <div className='size-28 min-w-12 rounded-full'>
          <Image
            src={userProfilePictureUrl || '/image.png'}
            alt='userImage'
            width={120}
            height={120}
            className='rounded-full'
          />
        </div>
      ) : (
        <div className='size-28 min-w-12 rounded-full bg-black/20'></div>
      )}
      <div className='flex flex-col'>
        <div className='text-xl font-bold md:whitespace-nowrap'>
          {userName ? userName : 'Guest'}
          <Badge variant='photographer' className='hidden lg:block'>
            Photographer
          </Badge>
        </div>
        <div>
          <p>{packageNums} Packages</p>
        </div>
      </div>
    </div>
  )
}
