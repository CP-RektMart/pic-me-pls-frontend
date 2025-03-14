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
    <div className='hidden space-x-3 lg:block lg:w-1/4'>
      <Image
        className='h-12 w-12 rounded-full'
        src={opponentProfilePic}
        alt='Profile photo'
        width={112}
        height={112}
      />
      <div className='col-span-4 flex flex-col'>
        <h2 className='text-base font-medium'>
          {isPhotographer ? opponentName : 'You'}
        </h2>
      </div>
    </div>
  )
}
