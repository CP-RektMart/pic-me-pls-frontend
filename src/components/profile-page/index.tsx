'use client'

import { Icon } from '@iconify/react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ProfilePageComponentProps {
  isPhotographer: boolean
}

interface FormData {
  name: string
  email: string
  phone: string
  facebook: string
  instagram: string
  bank?: string
  accountNo?: string
  bankBranch?: string
}

export default function ProfilePageComponent({
  ComponentProps,
}: {
  ComponentProps: ProfilePageComponentProps
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <div className='my-6 flex-col gap-6 space-y-6 px-12 lg:px-8'>
      <div className='flex h-10 flex-row'>
        <h1 className='items-center self-center text-2xl font-bold lg:text-3xl'>
          Edit Profile
        </h1>
        <button
          type='submit'
          form='profile-form'
          className='ml-auto flex items-center rounded-md border bg-zinc-800 px-4 py-2 hover:bg-zinc-700'
        >
          <Icon icon='lucide-lab:save' className='size-4 text-white' />
        </button>
      </div>
      <form
        id='profile-form'
        className='flex flex-col gap-8 lg:flex-row'
        onSubmit={handleSubmit(onSubmit)}
      >
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
              {...register('name', { required: true })}
            />
            {errors.name && (
              <p className='text-sm text-red-500'>Name is required</p>
            )}
          </div>
          <div className='space-y-1.5'>
            <p className='text-sm font-medium'>Email</p>
            <Input
              placeholder='admin@picmepls.com'
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className='text-sm text-red-500'>Email is required</p>
            )}
          </div>
          <div className='space-y-1.5'>
            <p className='text-sm font-medium'>Phone</p>
            <Input
              placeholder='0xx-xxx-xxxx'
              {...register('phone', { required: true })}
            />
            {errors.phone && (
              <p className='text-sm text-red-500'>Phone is required</p>
            )}
          </div>
          <div className='space-y-1.5'>
            <p className='text-sm font-medium'>Facebook</p>
            <Input placeholder='Facebook' {...register('facebook')} />
          </div>
          <div className='space-y-1.5'>
            <p className='text-sm font-medium'>Instagram</p>
            <Input placeholder='instagram' {...register('instagram')} />
          </div>
          {ComponentProps.isPhotographer && (
            <div className='flex-1 space-y-8'>
              <hr className='border-t border-zinc-200' />
              <h2 className='items-center self-center text-[24px] font-bold'>
                Payment Method
              </h2>
              <div className='space-y-1.5'>
                <p className='text-sm font-medium'>Bank</p>
                <Input placeholder='SCB' {...register('bank')} />
              </div>
              <div className='space-y-1.5'>
                <p className='text-sm font-medium'>Account No.</p>
                <Input placeholder='360-411175-6' {...register('accountNo')} />
              </div>
              <div className='space-y-1.5'>
                <p className='text-sm font-medium'>Branch</p>
                <Input
                  placeholder='Future Park Rangsit'
                  {...register('bankBranch')}
                />
              </div>
              <Button className='hover:bg-zinc-700' type='submit'>
                Revalidate Account
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
