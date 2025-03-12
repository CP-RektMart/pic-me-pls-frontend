import MockPhotoCard from '@public/images/mock-photo-card.svg'
import Image from 'next/image'

export interface PackageProps {
  title: string
  photographer: string
  price: string
  category: string
  imageUrl: string
  alt?: string
  onClick?: () => void
}

export default function PackageCard({
  title,
  photographer,
  price,
  category,
  imageUrl,
  alt = 'package photo',
}: PackageProps) {
  return (
    <div className='relative h-72 w-full overflow-hidden rounded-3xl shadow-lg'>
      <Image
        src={imageUrl || MockPhotoCard}
        alt={alt}
        width={360}
        height={290}
        className='absolute z-0 h-full w-full object-cover'
        priority
      />
      <div className='absolute bottom-2 left-2 right-2 z-10 rounded-2xl bg-white px-4 py-2'>
        <h1 className='text-gray text-base font-bold'>{title}</h1>
        <div className='mb-3 flex items-center gap-2 text-xs'>
          <span>📌{category}</span>
        </div>
        <div className='flex items-center justify-between'>
          <p className='text-xs'>{photographer}</p>
          <p className='font-bold'>{price} BAHT</p>
        </div>
      </div>
    </div>
  )
}
