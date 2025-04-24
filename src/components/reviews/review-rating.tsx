import { cn } from '@/lib/utils'
import { RatingScore } from '@/types/rating'
import { Star } from 'lucide-react'

export interface ReviewRatingProps {
  rating: RatingScore
}

export default function ReviewRating({ rating }: ReviewRatingProps) {
  return (
    <div className='flex flex-row space-x-2 lg:self-center'>
      {Array.from({ length: 5 }).map((_, index) => {
        const starValue = index + 1
        const isActiveFull = rating >= starValue
        const isActiveHalf = rating === starValue - 0.5

        return (
          <div key={index} className='relative'>
            {/* Background star (always rendered) */}
            <Star
              className={cn(
                'h-5 w-5',
                'text-[#dedceb]',
                isActiveFull && 'text-yellow-400'
              )}
              fill={isActiveFull ? 'currentColor' : '#dedceb'}
            />

            {/* Half star overlay */}
            {isActiveHalf && (
              <div className='absolute inset-0 w-1/2 overflow-hidden'>
                <Star
                  className={cn('h-5 w-5 text-yellow-400')}
                  fill='currentColor'
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
