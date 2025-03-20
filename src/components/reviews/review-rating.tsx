import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react'

export default function ReviewRating({
  rating,
}: {
  rating: 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5
}) {
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
          className='size-5'
        />
      ))}
    </div>
  )
}
