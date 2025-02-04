import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Page() {
  return (
    <div className='p-4'>
      <p className='mb-4 font-bold'>Verify your account</p>
      <div className='flex flex-col gap-8'>
        <div>upload area</div>
        <div className='space-y-1.5'>
          <p className='font-medium'>Citizen ID</p>
          <Input placeholder='1-XXXX-XXXXX-XX-X' />
        </div>
        <div className='flex flex-row gap-2'>
          <div className='space-y-1.5'>
            <p className='font-medium'>Expired Date</p>
            <Input placeholder='expired date' />
          </div>
          <div className='space-y-1.5'>
            <p className='font-medium'>Laser No.</p>
            <Input placeholder='MEx-xxxxxx-xx' />
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
