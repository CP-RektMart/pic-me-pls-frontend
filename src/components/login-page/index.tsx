'use client'

import { useState } from 'react'

import { UserType } from '@/type/user'
import Image from 'next/image'
import { useMediaQuery } from 'react-responsive'

import SignInDrawer from '@/components/sign-in-drawer'
import SignInForm from '@/components/sign-in-form'

import LoginButton from '../login-button'

export default function LoginPageComponent() {
  const [userType, setUserType] = useState('')
  const [isSignIn, setIsSignIn] = useState(false)
  const isMobile = useMediaQuery({ maxWidth: 767 })

  const handleUserIconClick = (clickType: UserType) => {
    setUserType((prevUserType) => {
      const newUserType = prevUserType === clickType ? '' : clickType
      setIsSignIn(prevUserType !== clickType || !isSignIn)
      return newUserType
    })
  }

  return (
    <div className='flex h-screen w-full'>
      {!isSignIn ? (
        <div className='flex w-full flex-col items-center justify-center'>
          <div className='flex h-[297.75px] w-[361px] flex-col items-center justify-center space-y-4'>
            <Image alt={''} src='logo.svg' width={64} height={67.75} />
            <h1 className='text-base font-medium'>Sign in as</h1>
            <p className='text-xs text-zinc-500'>
              Sign in to book photographers or showcase your talent.
            </p>
            {!isMobile ? (
              <div className='flex flex-row items-center space-x-4'>
                <LoginButton
                  userType='Customer'
                  onClick={() => handleUserIconClick('Customer')}
                />
                <LoginButton
                  userType='Photographer'
                  onClick={() => handleUserIconClick('Photographer')}
                />
              </div>
            ) : (
              <div className='flex flex-row items-center space-x-4'>
                <SignInDrawer
                  userType='Customer'
                  onClick={() => handleUserIconClick('Customer')}
                  onClose={() => {
                    setIsSignIn(false)
                    setUserType('')
                  }}
                />
                <SignInDrawer
                  userType='Photographer'
                  onClick={() => handleUserIconClick('Photographer')}
                  onClose={() => {
                    setIsSignIn(false)
                    setUserType('')
                  }}
                />
              </div>
            )}
          </div>
        </div>
      ) : !isMobile ? (
        <div className='flex w-full flex-col items-center justify-center md:w-1/2'>
          <div className='flex h-[297.75px] w-[361px] flex-col items-center justify-center space-y-4'>
            <Image alt={''} src='logo.svg' width={64} height={67.75} />
            <h1 className='text-base font-medium'>Sign in as</h1>
            <p className='text-xs text-zinc-500'>
              Sign in to book photographers or showcase your talent.
            </p>
            <div className='flex flex-row items-center space-x-4'>
              <LoginButton
                userType='Customer'
                onClick={() => handleUserIconClick('Customer')}
              />
              <LoginButton
                userType='Photographer'
                onClick={() => handleUserIconClick('Photographer')}
              />
            </div>
          </div>
          {userType === 'Customer' ? (
            <SignInForm userType='Customer' />
          ) : userType === 'Photographer' ? (
            <SignInForm userType='Photographer' />
          ) : null}
        </div>
      ) : (
        <div className='flex w-full flex-col items-center justify-center'>
          <div className='flex h-[297.75px] w-[361px] flex-col items-center justify-center space-y-4'>
            <Image alt={''} src='logo.svg' width={64} height={67.75} />
            <h1 className='text-base font-medium'>Sign in as</h1>
            <p className='text-xs text-zinc-500'>
              Sign in to book photographers or showcase your talent.
            </p>
            <div className='flex flex-row items-center space-x-4'>
              <SignInDrawer
                userType='Customer'
                onClick={() => handleUserIconClick('Customer')}
                onClose={() => {
                  setIsSignIn(false)
                  setUserType('')
                }}
              />
              <SignInDrawer
                userType='Photographer'
                onClick={() => handleUserIconClick('Photographer')}
                onClose={() => {
                  setIsSignIn(false)
                  setUserType('')
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
