import Image from 'next/image'

export interface PackageProps {
  title: string
  location: string
  photographer: string
  price: string
  imageUrl: string
  alt?: string
  onClick?: () => void
}

export default function PackageCard({
  title,
  location,
  photographer,
  price,
  imageUrl,
  alt = 'package photo',
}: PackageProps) {
  return (
    <div className='relative h-72 w-[360px] max-w-md overflow-hidden rounded-3xl bg-white shadow-lg'>
      <Image
        src={imageUrl || 'mockPhotoCard.svg'}
        alt={alt}
        width={360}
        height={290}
        className='absolute z-0 h-full w-full object-cover'
        priority
      />
      <div className='z-1 absolute bottom-2 left-2 right-2 rounded-2xl bg-white px-4 py-2'>
        <div>
          <h1 className='text-gray text-base font-bold'>{title}</h1>
          <div className='mb-3 flex items-center gap-2 text-xs'>
            <span>📍{location}</span>
          </div>
          <div className='flex items-center justify-between'>
            <p className='text-xs'>{photographer}</p>
            <p className='text-base font-bold'>{price}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
