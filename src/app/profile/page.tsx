import { useState } from 'react'

import { Icon } from '@iconify/react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ProfilePage() {
  // mock data, as a photographer
  const isPhotographer: boolean = true
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [facebook, setFacebook] = useState('')
  return (
    <div className='mx-12 my-6 flex-col gap-6 space-y-6 lg:px-8'>
      <div className='flex h-10 flex-row'>
        <h1 className='items-center self-center text-2xl font-bold lg:text-3xl'>
          Edit Profile
        </h1>
        <div className='ml-auto flex items-center rounded-md border bg-zinc-800 px-4 py-2 hover:bg-zinc-700'>
          <Icon icon='lucide-lab:save' className='text-white' width={16} />
        </div>
      </div>
      <div className='flex flex-col gap-8 lg:flex-row'>
        <div className='flex flex-1 justify-center'>
          <div className='relative my-8 h-[200px] w-[200px]'>
            <Image
              alt=''
              src={'/image.png'}
              width={200}
              height={200}
              className='rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
            />
            <div className='absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 shadow-md hover:bg-slate-200'>
              <Icon icon='lucide:edit' className='h-4 w-4 text-zinc-800' />
            </div>
          </div>
        </div>
        <div className='flex-1 space-y-8'>
          <div className='space-y-1.5'>
            <p className='text-sm font-medium'>Name</p>
            <Input
              placeholder='John Doe'
              className='h-10 justify-between px-3 py-2'
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='space-y-1.5'>
            <p className='text-sm font-medium'>Email</p>
            <Input
              placeholder='admin@picmepls.com'
              className='h-10 justify-between px-3 py-2'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='space-y-1.5'>
            <p className='text-sm font-medium'>Phone</p>
            <Input
              placeholder='0xx-xxx-xxxx'
              className='h-10 justify-between px-3 py-2'
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className='space-y-1.5'>
            <p className='text-sm font-medium'>Facebook</p>
            <Input
              placeholder='Facebook'
              className='h-10 justify-between px-3 py-2'
              onChange={(e) => setFacebook(e.target.value)}
            />
          </div>
          <div className='space-y-1.5'>
            <p className='text-sm font-medium'>Instagram</p>
            <Input
              placeholder='instagram'
              className='h-10 justify-between px-3 py-2'
            />
          </div>
          {isPhotographer ? (
            <div className='flex-1 space-y-8'>
              <hr className='border-t border-zinc-200' />
              <h2 className='items-center self-center text-[24px] font-bold'>
                Payment Method
              </h2>
              <div className='space-y-1.5'>
                <p className='text-sm font-medium'>Bank</p>
                <Input
                  placeholder='SCB'
                  className='h-10 justify-between px-3 py-2'
                />
              </div>
              <div className='space-y-1.5'>
                <p className='text-sm font-medium'>Account No.</p>
                <Input
                  placeholder='360-411175-6'
                  className='h-10 justify-between px-3 py-2'
                />
              </div>
              <div className='space-y-1.5'>
                <p className='text-sm font-medium'>Branch</p>
                <Input
                  placeholder='Future Park Rangsit'
                  className='h-10 justify-between px-3 py-2'
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
