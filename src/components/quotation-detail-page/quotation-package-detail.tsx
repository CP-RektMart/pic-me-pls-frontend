import Image from 'next/image'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import { Badge } from '../ui/badge'

interface QuotationPackageDetailProps {
  packageName: string
  packageDescription: string
  photographerPackageCounts: number
  photographerName: string
  packageImages: string[]
}

export default function QuotationPackageDetail({
  packageName,
  packageDescription,
  photographerPackageCounts,
  photographerName,
  packageImages,
}: QuotationPackageDetailProps) {
  return (
    <div className='space-y-6 px-2 py-6 lg:px-6'>
      <div className='flex flex-row items-center gap-6'>
        <Image
          src='/photographerProfile.svg'
          alt='Photographer'
          className='rounded-full lg:size-28'
          width={64}
          height={64}
        />
        <div className='grid grid-cols-2 gap-1 lg:grid-cols-[70%_30%]'>
          <div className='col-span-2 flex flex-row gap-2.5 text-2xl font-bold lg:col-span-1'>
            {photographerName}
          </div>
          <Badge className='justify-center bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700'>
            Photographer
          </Badge>
          <div className='self-center text-sm font-medium text-gray-500'>
            {photographerPackageCounts} Packages
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-y-2 text-xl font-bold'>
        {packageName}
        <div className='text-sm font-normal'>{packageDescription}</div>
      </div>

      <Carousel className='w-full max-w-xs'>
        <CarouselContent className='items-center justify-center'>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className='justify-center p-1'>
                <Image
                  src={packageImages[index % packageImages.length]}
                  alt='Package Image'
                  className='rounded-lg'
                  width={400}
                  height={400}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
