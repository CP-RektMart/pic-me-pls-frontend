import { Review } from '@/types/package'
import { RatingScore } from '@/types/rating'
import Image from 'next/image'

import ReviewRating from './review-rating'

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className='flex w-full flex-col items-center space-y-2.5 rounded-2xl bg-zinc-50 p-2.5'>
      <div className='flex w-full flex-col justify-between gap-y-2 lg:flex-row'>
        <div className='flex flex-row space-x-2'>
          <div className='size-8 shrink-0 overflow-hidden rounded-full'>
            <Image
              src={review.customer?.profilePictureUrl || '/default.jpg'}
              alt='Reviewer Profile'
              className='rounded-full object-cover'
              width={32}
              height={32}
            />
          </div>
          <div className='text-md line-clamp-1 self-center font-semibold'>
            {review.customer?.name}
          </div>
        </div>
        <ReviewRating rating={review.rating as RatingScore} />
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
