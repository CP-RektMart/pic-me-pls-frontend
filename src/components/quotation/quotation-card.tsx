import { cn } from '@/lib/utils'
import { QuotationDetailsProps } from '@/types/quotation'
import ProfileMockImage from '@public/images/profile-mock-image.png'
import Image from 'next/image'

import { QuotationStatusTag } from '@/components/quotation/quotation-status-tag'

export interface QuotationCardProps extends QuotationDetailsProps {
  // TODO: Add the image url in endpoint? or retrieve, now is mocking
  photographerImageUrl?: string
  className?: string
  onClickEvent?: () => void
}

export default function QuotationCard({
  quotationId,
  photographerImageUrl = ProfileMockImage.src,
  photographerName,
  from,
  to,
  quotationStatus,
  totalPrice,
  className,
  onClickEvent,
}: QuotationCardProps) {
  return (
    <button
      onClick={onClickEvent}
      className={cn('mx-auto w-full max-w-[380px]', className)}
    >
      <div className='rounded-3xl border bg-white shadow-sm'>
        <div className='flex items-center justify-between px-5 pb-3 pt-4'>
          <div className='flex items-center gap-4'>
            <div className='relative h-12 w-12 overflow-hidden rounded-full'>
              <Image
                src={photographerImageUrl}
                alt='Profile picture'
                fill
                className='object-cover'
              />
            </div>
            <div>
              <h2 className='text-base font-medium'>{photographerName}</h2>
              <p className='text-start text-xs text-gray-500'>{quotationId}</p>
            </div>
          </div>
          <QuotationStatusTag variant={quotationStatus} />
        </div>

        {/* Seperator */}
        <hr />

        <div className='grid grid-cols-2 gap-2 px-5 pb-4 pt-3 text-start'>
          <div>
            <p className='text-xs text-gray-500'>From</p>
            <p className='text-base font-semibold'>{from}</p>
          </div>
          <div>
            <p className='text-xs text-gray-500'>To</p>
            <p className='text-base font-semibold'>{to}</p>
          </div>
          <div className='col-span-2'>
            <p className='text-end text-xs text-gray-500'>
              Total Price
              <span className='ml-2.5 text-lg font-semibold text-black'>
                {totalPrice} Baht
              </span>
            </p>
          </div>
        </div>
      </div>
    </button>
  )
}
