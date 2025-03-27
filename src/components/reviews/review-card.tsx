import { Review } from '@/types/package'
import Image from 'next/image'

import ReviewRating from './review-rating'

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className='flex w-full flex-col items-center space-y-2.5 rounded-2xl bg-zinc-50 p-2.5'>
      <div className='flex w-full flex-col justify-between space-y-2 lg:flex-row'>
        <div className='flex flex-row space-x-2'>
          <Image
            src={review.customer?.profilePictureUrl || '/default.jpg'}
            alt='Reviewer Profile'
            className='rounded-full object-cover'
            width={32}
            height={32}
          />
          <div className='self-center font-semibold'>
            {review.customer?.name}
          </div>
        </div>
        <ReviewRating
          rating={
            (review.rating ?? 0) as
              | 1
              | 0.5
              | 1.5
              | 2
              | 2.5
              | 3
              | 3.5
              | 4
              | 4.5
              | 5
          }
        />
      </div>

      <div className='self-start text-sm'>
        {review.comment}{' '}
        <span className='text-xs text-gray-400'>
          {review.isEdited ? '(edited)' : ''}
        </span>
      </div>
    </div>
  )
}
