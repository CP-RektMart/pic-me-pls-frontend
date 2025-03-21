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
    <div className='w-full lg:hidden'>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='secondary' className='w-full space-x-2 px-4 py-2'>
            <Icon icon='lucide:message-circle' />
            See Reviews
          </Button>
        </DialogTrigger>
        <DialogContent className='max-h-[506px] w-11/12 gap-2 overflow-scroll rounded-lg p-0'>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <ReviewsWindow />
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
