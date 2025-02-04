import { Save } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ProfilePage() {
  const isPhotographer: boolean = true
  return (
    <div className='mx-12 my-6 flex-col gap-6 space-y-6 lg:px-8'>
      <div className='flex h-[40px] flex-row'>
        <h1 className='items-center self-center text-[24px] font-bold lg:text-3xl'>
          Edit Profile
        </h1>
        <div className='ml-auto flex items-center rounded-md border bg-zinc-800 px-4 py-2 hover:bg-zinc-700'>
          <Save size={16} className='text-white' />
        </div>
      </div>
      <div className='flex flex-col gap-8 lg:flex-row'>
        <div className='flex flex-1 justify-center'>
          <div>
            <Image
              alt=''
              src={'/image.png'}
              width={200}
              height={200}
              className='my-8 rounded-full'
            />
          </div>
        </div>
        <div className='flex-1 space-y-8'>
          <div className='space-y-1'>
            <p className='text-2xl'>Name</p>
            <Input placeholder='John Doe' className='px-3 py-2' />
          </div>
          <div className='space-y-1'>
            <p className='text-2xl'>Email</p>
            <Input placeholder='admin@picmepls.com' className='px-3 py-2' />
          </div>
          <div className='space-y-1'>
            <p className='text-2xl'>Phone</p>
            <Input placeholder='0xx-xxx-xxxx' className='px-3 py-2' />
          </div>
          <div className='space-y-1'>
            <p className='text-2xl'>Facebook</p>
            <Input placeholder='Facebook' className='px-3 py-2' />
          </div>
          <div className='space-y-1'>
            <p className='text-2xl'>Instagram</p>
            <Input placeholder='instagram' className='px-3 py-2' />
          </div>
          {isPhotographer ? (
            <div className='flex-1 space-y-8'>
              <hr className='border-t border-zinc-200' />
              <h2 className='items-center self-center text-[24px] font-bold'>
                Payment Method
              </h2>
              <div className='space-y-1'>
                <p className='text-2xl'>Bank</p>
                <Input placeholder='SCB' className='px-3 py-2' />
              </div>
              <div className='space-y-1'>
                <p className='text-2xl'>Account No.</p>
                <Input placeholder='360-411175-6' className='px-3 py-2' />
              </div>
              <div className='space-y-1'>
                <p className='text-2xl'>Branch</p>
                <Input
                  placeholder='Future Park Rangsit'
                  className='px-3 py-2'
                />
              </div>
              <Button className='hover:bg-zinc-700'>Revalidate Account</Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
