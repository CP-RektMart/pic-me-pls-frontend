'use client'

import { signIn } from '@/auth'
import { Icon } from '@iconify/react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'

import { UserType } from '@/type/user'

import SignInContent from './sign-in-content'

export default function SignInForm({
  userType,
}: {
  userType: UserType
}) {
  return (
    <form
      action={async () => {
        await signIn('google')
      }}
      className='fixed bottom-0 flex w-full flex-col right-0 h-full md:w-1/2 md:items-center md:justify-center border-none bg-zinc-100'
    >
      <SignInContent userType={userType} />
    </form>
  )
}