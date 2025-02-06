"use client";
import { UserType } from '@/type/user'
import { Icon } from '@iconify/react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'

export default function SignInContent({
  userType,
}: {
  userType: UserType | ''
}) {
  return (
    <>
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
      <div className='flex h-16 justify-center'>
        <Button type='submit' className='h-10 w-[80%] md:w-[345px]'>
          <Icon icon='flat-color-icons:google' className='size-3' />
          Login with email
        </Button>
      </div>
    </>
  )
}
