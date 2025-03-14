import Image from 'next/image'

export interface SidebarProfileProps {
  isPhotographer: boolean
  opponentName: string
  opponentProfilePic: string
}

export default function SidebarProfile({
  isPhotographer,
  opponentName,
  opponentProfilePic,
}: SidebarProfileProps) {
  return (
    <div className='hidden space-x-3 space-y-4 px-5 py-4 lg:flex lg:w-1/4 lg:flex-col'>
      <h1 className='text-xl font-bold'>
        Your {isPhotographer ? 'Customer' : 'Photographer'}
      </h1>
      <div className='flex w-full justify-center'>
        <Image
          className='rounded-full'
          src={opponentProfilePic}
          alt='Profile photo'
          width={112}
          height={112}
        />
      </div>

      <div className='col-span-4 flex flex-col'>
        <h2 className='text-base font-medium'>
          {isPhotographer ? opponentName : 'You'}
        </h2>
      </div>
    </div>
  )
}
