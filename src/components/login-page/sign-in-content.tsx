'use client'

import { UserType } from '@/types/user'
import { Icon } from '@iconify/react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'

export default function SignInContent({ userType }: { userType: UserType }) {
  return (
    <div>
      <div className='mt-4 flex flex-col gap-4 px-6 py-4'>
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
            width={224}
            height={152}
          />
        </div>
      </div>
      <div className='flex justify-center p-3'>
        <Button type='submit' className='h-10 w-full'>
          <Icon icon='flat-color-icons:google' className='size-3' />
          Login with email
        </Button>
      </div>
    </div>
  )
}
