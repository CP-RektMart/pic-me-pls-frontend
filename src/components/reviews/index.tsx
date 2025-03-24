import { getReviews } from '@/actions/review/get-reviews'

import ReviewWindowDialog from '@/components/reviews/review-window-dialog'
import ReviewsWindow from '@/components/reviews/reviews-window'

export default async function ReviewComponent({
  packageID,
}: {
  packageID: number
}) {
  const reviews = await getReviews(packageID)

  return (
    <div className='w-full'>
      <div className='hidden lg:flex'>
        <ReviewsWindow reviews={reviews} />
      </div>

      <ReviewWindowDialog reviews={reviews} />
    </div>
  )
}
