'use client'

import { signIn } from '@/auth'
import { Icon } from '@iconify/react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'

export default function SignIn({
  userType,
}: {
  userType: 'Customer' | 'Photographer' | ''
}) {
  return (
    <form
      action={async () => {
        await signIn('google')
      }}
      className='fixed bottom-0 right-0 flex h-[451px] w-full flex-col rounded-t-3xl border-[1px] border-zinc-200 bg-white md:right-0 md:h-full md:w-1/2 md:items-center md:justify-center md:rounded-none md:border-none md:bg-zinc-100'
    >
      <div className='mt-4 flex h-[294.76] flex-col gap-4 px-6 py-4'>
        <div className='text-lg font-semibold'>Sign in as {userType}</div>
        <div className='text-sm font-normal text-zinc-500'>
          {userType === 'Photographer'
            ? 'Log in to connect with clients and grow your photography business!'
            : userType === 'Customer'
              ? 'Log in to find the perfect photographer and bring your vision to life!'
              : ''}
        </div>
        <div className='flex w-full justify-center'>
          <Image
            src={
              userType === 'Photographer'
                ? 'PhotographerSigninIcon.svg'
                : userType === 'Customer'
                  ? 'CustomerSigninIcon.svg'
                  : ''
            }
            alt=''
            width={152}
            height={154}
          />
        </div>
      </div>
      <div className='flex h-16 items-center justify-center'>
        <Button type='submit' className='h-10 w-[345px]'>
          <Icon icon='flat-color-icons:google' width='12' height='12' />
          Login with email
        </Button>
      </div>
    </form>
  )
}
