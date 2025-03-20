import { Icon } from '@iconify/react'

import { Button } from '../ui/button'
import ReviewsWindow from './reviews-window'

export default function ReviewWindowManager() {
  return (
    <div>
      <ReviewsWindow />
      <Button variant={'secondary'} className='space-x-2 px-4 py-2'>
        <Icon icon={'iconamoon:comment'} />
        See Reviews
      </Button>
    </div>
  )
}
