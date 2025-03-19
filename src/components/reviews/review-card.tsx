import { Review } from '@/actions/review/get-reviews'
import Image from 'next/image'

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className='flex items-center space-x-4'>
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
  )
}
