import { CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export default function Page() {
  return (
    <div className='p-4'>
      <p className='mb-4 font-bold'>Verify your account</p>
      <div className='flex flex-col gap-8'>
        <div>upload area</div>
        <div className='flex flex-col gap-2'>
          <div className='space-y-1.5'>
            <p className='font-medium'>Citizen ID</p>
            <Input placeholder='1-XXXX-XXXXX-XX-X' />
          </div>
          <div className='flex flex-row justify-between gap-2'>
            <div className='flex-1 space-y-1.5'>
              <p className='font-medium'>Expired Date</p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className='flex w-full justify-between'
                  >
                    <p className='text-zinc-500'>21 Mar 2024</p>
                    <CalendarIcon size={16} color='#71717A' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar mode='single' />
                </PopoverContent>
              </Popover>
            </div>
            <div className='flex-1 space-y-1.5'>
              <p className='font-medium'>Laser No.</p>
              <Input placeholder='MEx-xxxxxx-xx' />
            </div>
          </div>
        </div>
        <div>
          <div className='flex space-x-2'>
            <Checkbox id='terms' />
            <div className='flex flex-col space-y-1.5 leading-none'>
              <Label
                htmlFor='terms'
                className='mt-0.5 text-sm font-medium leading-none'
              >
                Accept terms and conditions
              </Label>
              <p className='text-sm text-zinc-500'>
                You agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
        <Button className='self-end'>Submit</Button>
      </div>
    </div>
  )
}
