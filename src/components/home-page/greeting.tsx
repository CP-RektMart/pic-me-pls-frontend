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
      {userProfilePictureUrl ? (
        <div className='size-12 min-w-12 rounded-full'>
          <Image
            src={userProfilePictureUrl || '/image.png'}
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
          {userName ? userName : 'Guest'}
        </div>
      </div>
    </div>
  )
}
