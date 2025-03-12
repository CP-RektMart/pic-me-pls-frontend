import ProfileMockImage from '@public/images/profile-mock-image.png'
import Image from 'next/image'

export default function Greeting({
  userName,
  userProfilePictureUrl,
}: {
  userName: string | undefined
  userProfilePictureUrl: string | undefined
}) {
  return (
    <div className='flex items-center gap-2'>
      <div>
        {userProfilePictureUrl ? (
          <div className='relative size-12 rounded-full'>
            <Image
              src={userProfilePictureUrl || ProfileMockImage}
              alt='userImage'
              fill
              className='rounded-full object-cover'
            />
          </div>
        ) : (
          <div className='size-12 rounded-full bg-black/20'></div>
        )}
      </div>
      <div className='flex flex-col'>
        <div className='text-xs text-slate-400 md:whitespace-nowrap'>
          Good to see you 👋
        </div>
        <div className='text-xl font-medium md:whitespace-nowrap'>
          {userName ? userName : 'Guest'}
        </div>
      </div>
    </div>
  )
}
