import { Review } from '@/types/package'
import { Star } from 'lucide-react'

import { ProfileThumbnail } from './profileThumbnail'

interface ReviewsSectionProps {
  reviews: Review[]
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  return (
    <div className='flex flex-col gap-4 rounded-lg border p-4'>
      <h2 className='text-xl font-bold'>Reviews</h2>
      <div className='mt-4 space-y-4'>
        {reviews.map((review, index) => (
          <div key={index} className='rounded-lg border p-4'>
            <div className='flex items-center gap-4'>
              <div className='flex w-full flex-col'>
                <div className='flex items-center justify-between gap-2'>
                  <ProfileThumbnail
                    profilePictureUrl={
                      review.customer?.profilePictureUrl || '/default.jpg'
                    }
                    name={review.customer?.name || 'Anonymous'}
                    haveVerifiedBadge={false}
                    isVerified={false}
                    imageSize={35}
                  />
                  <div className='flex gap-1'>
                    {/* Render star rating */}
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className={
                          starIndex < (review.rating ?? 0)
                            ? 'text-yellow-500'
                            : 'text-gray-300'
                        }
                        size={16}
                      />
                    ))}
                  </div>
                </div>
                <p className='mt-2 text-gray-600'>{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
