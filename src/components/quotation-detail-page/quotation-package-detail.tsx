import Image from 'next/image'

import { Badge } from '../ui/badge'

interface QuotationPackageDetailProps {
  packageName: string
  packageDescription: string
  photographerPackageCounts: number
  photographerName: string
}

export default function QuotationPackageDetail({
  packageName,
  packageDescription,
  photographerPackageCounts,
  photographerName,
}: QuotationPackageDetailProps) {
  return (
    <div className='space-y-6 p-6'>
      <div className='flex flex-row items-center gap-6'>
        <Image
          src='/photographerProfile.svg'
          alt='Photographer'
          className='rounded-full'
          width={112}
          height={112}
        />
        <div className='flex flex-col'>
          <div className='flex flex-row gap-2.5 text-2xl font-bold'>
            {photographerName}
            <Badge className='bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700'>
              Photographer
            </Badge>
          </div>
          <div className='text-sm font-medium text-gray-500'>
            {photographerPackageCounts} Packages
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-y-2 text-xl font-bold'>
        {packageName}
        <div className='text-sm font-normal'>{packageDescription}</div>
      </div>
    </div>
  )
}
