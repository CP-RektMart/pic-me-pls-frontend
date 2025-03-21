import { Icon } from '@iconify/react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import ReviewsWindow from './reviews-window'

export default function ReviewWindowDialog() {
  return (
    <div className='lg:hidden'>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'secondary'} className='space-x-2 px-4 py-2'>
            <Icon icon={'iconamoon:comment'} />
            See Reviews
          </Button>
        </DialogTrigger>
        <DialogContent className='max-h-[506px] w-11/12 overflow-scroll rounded-lg p-0'>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <ReviewsWindow />
          <DialogFooter className='sm:justify-start'></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
