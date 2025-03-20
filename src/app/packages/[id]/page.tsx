import ReviewWindowDialog from '@/components/reviews/review-window-dialog'
import ReviewsWindow from '@/components/reviews/reviews-window'

export default function PackagePage() {
  return (
    <div className='p-5'>
      <div className='hidden lg:flex'>
        <ReviewsWindow />
      </div>

      <ReviewWindowDialog />
    </div>
  )
}
