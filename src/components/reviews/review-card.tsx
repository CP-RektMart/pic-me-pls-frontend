import { Review } from '@/actions/review/get-reviews'
import Image from 'next/image'

import ReviewRating from './review-rating'

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className='flex w-full flex-col items-center space-y-2.5 rounded-2xl bg-zinc-50 p-2.5'>
      <div className='flex w-full flex-row justify-between'>
        <div className='flex flex-row space-x-2'>
          <Image
            src={review.reviewerProfilePic}
            alt='Reviewer Profile'
            className='rounded-full object-cover'
            width={32}
            height={32}
          />
          <div className='self-center font-semibold'>{review.reviewer}</div>
        </div>
        <ReviewRating rating={review.rating} />
      </div>

      <div className='self-start text-sm'>{review.comment}</div>
    </div>
  )
}
