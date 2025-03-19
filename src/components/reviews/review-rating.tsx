import { Icon } from '@iconify/react'

export default function ReviewRating({
  rating,
}: {
  rating: 1 | 2 | 3 | 4 | 5
}) {
  return (
    <div className='flex flex-row space-x-1 self-center'>
      {Array.from({ length: 5 }, (_, index) => (
        <Icon
          key={index}
          icon='lucide:star'
          className='size-5'
          color={index < rating ? 'currentColor' : 'lightgray'}
        />
      ))}
    </div>
  )
}
