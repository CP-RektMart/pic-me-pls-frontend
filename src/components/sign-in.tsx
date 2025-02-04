import { signIn } from '@/auth'
import Image from 'next/image'

import { Button } from '@/components/ui/button'

export default function SignIn({
  userType,
}: {
  userType: 'Customer' | 'Photographer'
}) {
  return (
    <form
      action={async () => {
        'use server'
        await signIn('google')
      }}
      className='fixed bottom-0 flex h-[451px] w-full flex-col items-center justify-center rounded-t-3xl bg-zinc-100 md:h-full md:w-[50vw] md:rounded-none md:right-0'
    >
      <div className='flex h-[294.76] flex-col items-center justify-center gap-4 px-6 py-4'>
        <div className='text-lg font-semibold'>Sign in as {userType}</div>
        {userType == 'Photographer' ? (
          <div className='text-sm font-normal text-zinc-500'>
            Log in to connect with clients and grow your photography business!
          </div>
        ) : (
          <div className='text-sm font-normal text-zinc-500'>
            Log in to find the perfect photographer and bring your vision to
            life!
          </div>
        )}
        {userType == 'Photographer' ? (
          <Image src='photographerIcon.svg' alt={''} width={152} height={154} />
        ) : (
          <Image src='customerIcon.svg' alt={''} width={152} height={154} />
        )}
      </div>
      <div className='flex h-16 items-center justify-center'>
        <Button type='submit' className='h-10 w-[345px]'>
          Login with email
        </Button>
      </div>
    </form>
  )
}
