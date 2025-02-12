'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { UserType } from '@/types/user'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import LoginButton from './login-button'
import SignInDrawer from './sign-in-drawer'
import SignInForm from './sign-in-form'

export default function RegisterPageComponent() {
  const searchParams = useSearchParams()

  const [isLoggedInError, setIsLoggedInError] = useState(
    searchParams.get('error') === 'AccessDenied'
  )

  const [userType, setUserType] = useState('')
  const [isSignIn, setIsSignIn] = useState(false)

  const handleUserIconClick = async (clickType: UserType) => {
    setUserType((prevUserType) => {
      const newUserType = prevUserType === clickType ? '' : clickType

      return newUserType
    })
    setIsSignIn((prevIsSignIn) => !prevIsSignIn || userType !== clickType)
  }

  const handleDrawerClose = () => {
    setIsSignIn(false)
    setUserType('')
  }

  return (
    <>
      <div className='flex flex-1'>
        <div
          className={cn(
            'grid h-full flex-1',
            isSignIn ? 'md:grid-cols-2' : 'grid-cols-1'
          )}
        >
          <div className='flex flex-col items-center justify-center space-y-4'>
            <Image alt={''} src='logo.svg' width={64} height={67.75} />
            <h1 className='text-base font-medium'>Sign in as</h1>
            <p className='text-xs text-zinc-500'>
              Sign in to book photographers or showcase your talent.
            </p>
            <div className='hidden flex-row items-center space-x-4 md:flex'>
              <LoginButton
                userType='Customer'
                onClick={() => handleUserIconClick('Customer')}
                isActive={userType === 'Customer'}
              />
              <LoginButton
                userType='Photographer'
                onClick={() => handleUserIconClick('Photographer')}
                isActive={userType === 'Photographer'}
              />
            </div>
            <div className='flex flex-row items-center space-x-4 md:hidden'>
              <SignInDrawer
                userType='Customer'
                onClick={() => handleUserIconClick('Customer')}
                onClose={() => handleDrawerClose()}
              />
              <SignInDrawer
                userType='Photographer'
                onClick={() => handleUserIconClick('Photographer')}
                onClose={() => handleDrawerClose()}
              />
            </div>
            <div className='text-sm'>
              {'Already have an account? '}{' '}
              <Link href='/login' className='text-blue-500 hover:underline'>
                Sign in
              </Link>
            </div>
          </div>
          {userType === 'Customer' ? (
            <SignInForm userType='Customer' />
          ) : userType === 'Photographer' ? (
            <SignInForm userType='Photographer' />
          ) : null}
        </div>
      </div>

      <AlertDialog open={isLoggedInError} onOpenChange={setIsLoggedInError}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-red-700'>
              Access Denied
            </AlertDialogTitle>
            <AlertDialogDescription>
              {
                "You might have already signed up or you don't have an account yet."
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Dismiss</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
