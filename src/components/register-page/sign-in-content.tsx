'use client'

import { setRole } from '@/server/actions/set-cookie'
import { UserType } from '@/types/user'
import { Icon } from '@iconify/react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'

export default function SignInContent({ userType }: { userType?: UserType }) {
  const handleLogin = async () => {
    await setRole(userType)
    await signIn('google', {
      redirectTo: '/',
    })
  }

  return (
    <div className='max-w-lg'>
      <div className='mt-4 flex flex-col gap-4 px-6 py-4'>
        <div className='text-lg font-semibold'>
          Sign in {userType ? `as ${userType}` : null}
        </div>
        <div className='text-sm font-normal text-zinc-500'>
          {userType === 'Photographer'
            ? 'Log in to connect with clients and grow your photography business!'
            : userType === 'Customer'
              ? 'Log in to find the perfect photographer and bring your vision to life!'
              : 'Sign in to showcase your photography skills or find the perfect photographer for your needs!'}
        </div>
        <div className='flex w-full justify-center'>
          <Image
            src={
              userType === 'Photographer'
                ? 'PhotographerSigninIcon.svg'
                : userType === 'Customer'
                  ? 'CustomerSigninIcon.svg'
                  : 'SignIn.svg'
            }
            alt=''
            width={224}
            height={152}
          />
        </div>
      </div>
      <div className='flex justify-center p-3'>
        <Button type='button' className='h-10 w-full' onClick={handleLogin}>
          <Icon icon='flat-color-icons:google' className='size-3' />
          Login with Google
        </Button>
      </div>
    </div>
  )
}
