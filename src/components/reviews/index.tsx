import { Review } from '@/types/package'

import ReviewWindowDialog from '@/components/reviews/review-window-dialog'
import ReviewsWindow from '@/components/reviews/reviews-window'

// import {getReviews} from '@/actions/review/get-reviews'

export default function ReviewComponent({ reviews }: { reviews: Review[] }) {
  // const reviews = await getReviews() with package Id;

  return (
    <div className='w-full'>
      <div className='hidden lg:flex'>
        <ReviewsWindow reviews={reviews} />
      </div>

      <ReviewWindowDialog reviews={reviews} />
    </div>
  )
}
