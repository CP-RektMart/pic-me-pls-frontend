import { cn } from '@/lib/utils'
import { RatingScore } from '@/types/rating'
import { Icon } from '@iconify/react'

export interface ReviewRatingProps {
  rating: RatingScore
}

export default function ReviewRating({ rating }: ReviewRatingProps) {
  return (
    <div className='flex flex-row space-x-1 lg:self-center'>
      {Array.from({ length: 5 }, (_, index) => (
        <Icon
          key={index}
          icon={cn(
            index < rating
              ? cn(
                  index + 1 > rating
                    ? 'mingcute:star-half-fill'
                    : 'mingcute:star-fill'
                )
              : 'lucide:star'
          )}
          className='size-5 text-yellow-400'
        />
      ))}
    </div>
  )
}
