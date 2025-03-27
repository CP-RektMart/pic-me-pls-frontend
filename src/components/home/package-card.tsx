'use client'

import MockPhotoCard from '@public/images/mock-photo-card.jpg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export interface PackageProps {
  title: string
  photographer: string
  price: string
  category: string
  imageUrl: string
  photographerId?: number
  alt?: string
  link?: string
}

export default function PackageCard({
  title,
  photographer,
  price,
  category,
  imageUrl,
  photographerId,
  alt = 'package photo',
  link,
}: PackageProps) {
  const router = useRouter()

  const handleCardClick = () => {
    if (link) {
      router.push(link)
    }
  }

  const handlePhotographerClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (photographerId) {
      router.push(`/photographers/${photographerId}`)
    }
  }

  return (
    <div
      className='relative h-72 w-full min-w-[320px] max-w-[500px] cursor-pointer overflow-hidden rounded-3xl shadow-lg'
      data-testid='package-card'
      onClick={handleCardClick}
    >
      <Image
        src={imageUrl || MockPhotoCard}
        alt={alt}
        width={360}
        height={290}
        className='absolute z-0 h-full w-full object-cover'
        priority
      />
      <div className='absolute bottom-2 left-2 right-2 z-10 rounded-2xl bg-white px-4 py-2'>
        <h1
          className='text-gray text-base font-bold'
          data-testid={`package-title-${title}`}
        >
          {title}
        </h1>
        <div className='mb-3 flex items-center gap-2 text-xs'>
          <span data-testid={`package-category-${category}`}>
            📌 {category}
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <div>
            {photographerId && photographer ? (
              <span
                className='cursor-pointer text-xs text-base-quaternary hover:underline'
                onClick={handlePhotographerClick}
              >
                {photographer}
              </span>
            ) : (
              <div></div>
            )}
          </div>
          <p className='font-bold'>{price} BAHT</p>
        </div>
      </div>
    </div>
  )
}
