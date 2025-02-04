import Image from 'next/image'

import SignIn from '@/components/sign-in'
import { Button } from '@/components/ui/button'

export default function LoginPage() {

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <div className='flex h-[297.75px] w-[361px] flex-col items-center justify-center space-y-4'>
        <Image alt={''} src='logo.svg' width={64} height={67.75} />
        <h1 className='text-base font-medium'>Sign in as</h1>
        <p className='text-xs text-zinc-500'>
          Sign in to book photographers or showcase your talent.
        </p>
        <div className='flex flex-row space-x-4'>
          <Image src='customerIcon.svg' alt={''} width={152} height={154} />
          <Image src='photographerIcon.svg' alt={''} width={152} height={154} />
        </div>
      </div>
        {/* <SignIn userType='Customer' /> */}
    </div>
  )
}
