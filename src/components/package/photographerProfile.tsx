import Image from 'next/image'

interface PhotographerProfileProps {
  profilePictureUrl: string
  name: string
}

export function PhotographerProfile({
  profilePictureUrl,
  name,
}: PhotographerProfileProps) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-2'>
        <div className='relative h-12 w-12 overflow-hidden rounded-full'>
          <Image
            src={profilePictureUrl || '/default.jpg'}
            alt={name || 'Photographer profile'}
            className='object-cover'
            fill
          />
        </div>
        <div className='flex flex-col items-center gap-2'>
          <h3 className='flex items-center gap-2 text-lg font-bold'>
            {name || 'Photographer Name'}
            <span className='rounded-full bg-[#D0FAE5] px-2 py-1 text-sm text-[#007A55]'>
              Verified
            </span>
          </h3>
        </div>
      </div>
      <p className='flex w-full justify-between text-sm text-gray-500'>
        <span>0 Packages</span>
        <span>0 Pending Jobs</span>
        <span>0 Jobs done</span>
        {/* TODO: Add real data here from the API */}
      </p>
    </div>
  )
}
