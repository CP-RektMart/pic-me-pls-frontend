import Image from 'next/image'

import { Badge } from '@/components/ui/badge'

interface ProfileHeaderProps {
  imageUrl: string
  name: string
  packageNumber: number
}

export default function ProfileHeader({
  imageUrl,
  name,
  packageNumber,
}: ProfileHeaderProps) {
  return (
    <div className='flex flex-row items-center gap-6'>
      <Image
        src={imageUrl || '/image.png'}
        alt='image profile'
        className='size-16 rounded-full lg:size-28'
        width={112}
        height={112}
      />
      <div className='flex flex-col gap-1'>
        <div className='flex flex-row items-center gap-2.5'>
          <p className='text-xl font-bold lg:text-2xl'>{name}</p>
          <Badge variant='photographer' className='hidden lg:block'>
            Photographer
          </Badge>
        </div>
        <div className='flex flex-row items-center gap-3'>
          <Badge variant='photographer' className='lg:hidden'>
            Photographer
          </Badge>
          <p className='text-center text-sm font-medium text-gray-500 lg:mt-1'>
            {packageNumber} Packages
          </p>
        </div>
      </div>
    </div>
  )
}
