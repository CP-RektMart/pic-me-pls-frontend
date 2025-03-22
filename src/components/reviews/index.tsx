import { Review } from '@/types/package'

import ReviewWindowDialog from '@/components/reviews/review-window-dialog'
import ReviewsWindow from '@/components/reviews/reviews-window'

export default function ReviewComponent({ reviews }: { reviews: Review[] }) {
  return (
    <div className='w-full'>
      <div className='hidden lg:flex'>
        <ReviewsWindow reviews={reviews} />
      </div>

      <ReviewWindowDialog reviews={reviews} />
    </div>
  )
}
