import { getReviews } from '@/actions/review/get-reviews'
import { Icon } from '@iconify/react'

import ReviewCard from './review-card'

export default function ReviewsWindow() {
  const reviews = getReviews()

  return (
    <div className='flex w-full flex-col space-y-4 border-zinc-200 px-6 lg:w-[448px] lg:rounded-xl lg:border lg:p-6 lg:shadow'>
      <div className='w-full font-semibold'>Reviews</div>
      <div className='mt-4 flex flex-col space-y-4'>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className='flex w-full items-center space-x-4'>
              <ReviewCard review={review} />
            </div>
          ))
        ) : (
          <div className='flex min-h-96 flex-col items-center justify-center space-y-2'>
            <Icon icon='lucide:search' className='size-12' />
            No reviews yet
          </div>
        )}
      </div>
    </div>
  )
}
