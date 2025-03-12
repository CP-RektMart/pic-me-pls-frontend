'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import Image from 'next/image'

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

interface ImageCarouselProps {
  images: {
    url: string
    name: string
  }[]
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [current, setCurrent] = useState<number>(0)

  useEffect(() => {
    if (!api) return

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className='relative mx-auto mt-6 w-[450px]'>
      <Carousel
        setApi={setApi}
        className='w-full'
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className='relative mx-auto aspect-[4/3] w-96 rounded-2xl'>
                <Image
                  src={image.url || ''}
                  alt={image.name}
                  fill
                  className='rounded-2xl object-cover'
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious variant='ghost' />
        <CarouselNext variant='ghost' />
      </Carousel>
      <div className='absolute -bottom-4 left-0 right-0 flex justify-center gap-2'>
        {images.map((_, index) => (
          <button
            key={index}
            className={cn(
              'h-2 w-2 rounded-full transition-all',
              current === index ? 'bg-gray-400' : 'bg-gray-400/50'
            )}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
