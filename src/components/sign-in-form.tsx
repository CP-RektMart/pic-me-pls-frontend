'use client'

import { signIn } from '@/auth'
import { UserType } from '@/type/user'

import SignInContent from './sign-in-content'

export default function SignInForm({ userType }: { userType: UserType }) {
  return (
    <form
      action={async () => {
        await signIn('google')
      }}
      className='fixed bottom-0 right-0 flex h-full w-full flex-col border-none bg-zinc-100 md:w-1/2 md:items-center md:justify-center'
    >
      <SignInContent userType={userType} />
    </form>
  )
}
