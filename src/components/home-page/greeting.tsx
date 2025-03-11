import { User } from '@/types/user'
import Image from 'next/image'

export default function Greeting({
  userProfile,
}: {
  userProfile: User | undefined
}) {
  return (
    <div className='flex items-center gap-2'>
      {userProfile ? (
        <div className='size-12 min-w-12 rounded-full'>
          <Image
            src={userProfile.profilePictureUrl || '/image.png'}
            alt='userImage'
            width={48}
            height={48}
            className='rounded-full'
          />
        </div>
      ) : (
        <div className='size-12 min-w-12 rounded-full bg-black/20'></div>
      )}
      <div className='flex flex-col'>
        <div className='text-xs text-slate-400 md:whitespace-nowrap'>
          Good to see you 👋
        </div>
        <div className='text-2xl font-medium md:whitespace-nowrap'>
          {userProfile ? userProfile.name : 'Guest'}
        </div>
      </div>
    </div>
  )
}
