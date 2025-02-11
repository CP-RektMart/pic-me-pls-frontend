'use client'

import { signIn } from '@/auth'
import { UserType } from '@/types/user'

import SignInContent from './sign-in-content'

export default function SignInForm({ userType }: { userType: UserType }) {
  return (
    <form
      action={async () => {
        await signIn('google')
      }}
      className='hidden h-full w-full flex-col items-center justify-center bg-zinc-100 md:flex'
    >
      <SignInContent userType={userType} />
    </form>
  )
}
