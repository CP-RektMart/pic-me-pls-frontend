'use client'

import * as React from 'react'

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
  const [api, setApi] = React.useState<CarouselApi | null>(null)
  const [current, setCurrent] = React.useState<number>(0)

  React.useEffect(() => {
    if (!api) return

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className='relative hidden w-[450px] lg:block'>
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
              <div className='relative mx-auto aspect-[16/9] w-96 rounded-2xl'>
                <Image
                  src={image.url || '/placeholder.svg'}
                  alt={image.name}
                  fill
                  className='rounded-2xl'
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='-left-1' variant='ghost' />
        <CarouselNext className='-right-1' variant='ghost' />
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
