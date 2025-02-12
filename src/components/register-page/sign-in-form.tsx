import { UserType } from '@/types/user'

import SignInContent from './sign-in-content'

export default function SignInForm({ userType }: { userType: UserType }) {
  return (
    <div className='hidden h-full w-full flex-col items-center justify-center bg-zinc-100 md:flex'>
      <SignInContent userType={userType} />
    </div>
  )
}
