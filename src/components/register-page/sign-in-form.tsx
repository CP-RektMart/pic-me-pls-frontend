import { UserType } from '@/types/user'
import { motion } from 'motion/react'

import SignInContent from './sign-in-content'

export default function SignInForm({ userType }: { userType: UserType }) {
  return (
    <motion.div
      key={userType}
      initial={{
        translateX: 200,
      }}
      animate={{
        translateX: 0,
      }}
      exit={{
        translateX: 200,
      }}
      className='hidden h-full w-full flex-col items-center justify-center bg-zinc-100 md:flex'
    >
      <SignInContent userType={userType} />
    </motion.div>
  )
}
