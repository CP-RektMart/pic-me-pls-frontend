'use client'

import Link from 'next/link'

import SignInContent from '../register-page/sign-in-content'

export default function LoginPageComponent() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center'>
      <SignInContent />
      <div className='text-sm'>
        {"Don't have account yet? "}
        <Link href='/sign-up' className='text-blue-500 hover:underline'>
          Create new account
        </Link>
      </div>
    </div>
  )
}
