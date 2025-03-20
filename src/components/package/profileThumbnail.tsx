import Image from 'next/image'

interface ProfileThumbnailProps {
  profilePictureUrl: string
  name: string
  haveVerifiedBadge: boolean
  isVerified: boolean
  imageSize: number
}

export function ProfileThumbnail({
  profilePictureUrl,
  name,
  haveVerifiedBadge,
  isVerified,
  imageSize,
}: ProfileThumbnailProps) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-2'>
        <div
          className={`relative overflow-hidden rounded-full`}
          style={{ height: `${imageSize}px`, width: `${imageSize}px` }}
        >
          <Image
            src={profilePictureUrl || '/default.jpg'}
            alt={name || 'profile'}
            className='object-cover'
            layout='fill'
          />
        </div>
        <div className='flex flex-col items-center gap-2'>
          <h3 className='flex items-center gap-2 text-lg font-bold'>
            {name || 'Name'}
            {haveVerifiedBadge ? (
              <span className='rounded-full bg-[#D0FAE5] px-2 py-1 text-sm text-[#007A55]'>
                {isVerified ? 'Verified' : 'Unverified'}
              </span>
            ) : null}
          </h3>
        </div>
      </div>
    </div>
  )
}
