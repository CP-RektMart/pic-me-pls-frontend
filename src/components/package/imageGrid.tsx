import { useState } from 'react'

import { Media } from '@/types/package'
import Image from 'next/image'
import Link from 'next/link'

export function ImageGrid({ media }: { media: Media[] }) {
  return (
    <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {media?.map((mediaItem, index) => (
        <ImageWithLoading
          key={index}
          src={mediaItem.pictureUrl || '/default.jpg'}
          alt={`Image ${index + 1}`}
        />
      ))}
    </div>
  )
}

function ImageWithLoading({ src, alt }: { src: string; alt: string }) {
  const [loading, setLoading] = useState(true)

  return (
    <div className='relative h-[180px] w-full overflow-hidden rounded-lg bg-gray-200'>
      {loading && (
        <div className='absolute inset-0 animate-pulse bg-gray-200'></div>
      )}
      <Link href={src} target='_blank' rel='noopener noreferrer'>
        <Image
          src={src}
          alt={alt}
          layout='fill'
          objectFit='cover'
          className={`rounded-lg transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
          onLoadingComplete={() => setLoading(false)}
        />
      </Link>
    </div>
  )
}
