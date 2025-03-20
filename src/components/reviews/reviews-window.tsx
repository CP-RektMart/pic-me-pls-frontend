import { getReviews } from '@/actions/review/get-reviews'

import ReviewCard from './review-card'

export default function ReviewsWindow() {
  const reviews = getReviews()

  return (
    <div className='flex w-full flex-col space-y-4 border-zinc-200 p-6 lg:w-[448px] lg:rounded-xl lg:border lg:shadow'>
      <div className='w-full font-semibold'>Reviews</div>
      <div className='mt-4 flex flex-col space-y-4'>
        {reviews.map((review) => (
          <div key={review.id} className='flex w-full items-center space-x-4'>
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
    </div>
  )
}
