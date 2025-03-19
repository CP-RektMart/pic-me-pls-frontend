import { getReviews } from '@/actions/review/get-reviews'
import Image from 'next/image'

export default function ReviewsWindow() {
  const reviews = getReviews()

  return (
    <div className='flex flex-col rounded-xl border border-zinc-200 p-6 shadow'>
      <div className='w-full font-semibold'>Reviews</div>
      <div className='mt-4 flex flex-col'>
        {reviews.map((review) => (
          <div key={review.id} className='flex items-center space-x-4'>
            <Image
              src={review.reviewerProfilePic}
              alt='Reviewer Profile'
              className='h-10 w-10 rounded-full'
              width={32}
              height={32}
            />
            <div className='flex flex-col'>
              <div className='font-semibold'>{review.reviewer}</div>
              <div className='text-sm'>{review.comment}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
