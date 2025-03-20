import Image from 'next/image'

interface HeaderImageProps {
  imageUrl: string
  title: string
}

export function HeaderImage({ imageUrl, title }: HeaderImageProps) {
  return (
    <div className='relative h-72 w-full overflow-hidden'>
      <Image
        src={imageUrl || '/default.jpg'}
        alt={title || 'Package image'}
        layout='fill'
        objectFit='cover'
      />
      <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-center text-white'>
        <h1 className='text-4xl font-bold'>{title}</h1>
      </div>
    </div>
  )
}
