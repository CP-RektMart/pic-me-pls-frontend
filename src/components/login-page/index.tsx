'use client'

import { motion } from 'motion/react'
import Link from 'next/link'

import SignInContent from '../register-page/sign-in-content'

export default function LoginPageComponent() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center'>
      <motion.div
        key='base'
        initial={{ translateY: -50 }}
        animate={{ translateY: 0 }}
        exit={{ translateY: -50 }}
        className='flex flex-col items-center justify-center space-y-4'
      >
        <SignInContent />
        <div className='text-center text-sm'>
          {"Don't have account yet? "}
          <Link href='/sign-up' className='text-blue-500 hover:underline'>
            Create new account
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
