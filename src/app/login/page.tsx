'use client'

import { useState } from 'react'

import { Icon } from '@iconify/react'
import Image from 'next/image'
import { useMediaQuery } from 'react-responsive'

import SignIn from '@/components/sign-in'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

export default function LoginPage() {
  const [userType, setUserType] = useState('Customer')
  const [isSignIn, setIsSignIn] = useState(true)
  const isMobile = useMediaQuery({ maxWidth: 767 })

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
              <div className='flex flex-row space-x-4'>
                <Image
                  src='customerIcon.svg'
                  alt={''}
                  width={152}
                  height={154}
                />
                <Image
                  src='photographerIcon.svg'
                  alt={''}
                  width={152}
                  height={154}
                />
              </div>
            ) : (
              <div className='flex flex-row items-center space-x-4'>
                <Drawer open>
                  <DrawerTrigger>
                    <Image
                      src='customerIcon.svg'
                      alt={''}
                      width={152}
                      height={154}
                    />
                  </DrawerTrigger>
                  <DrawerContent className='rounded-t-3xl'>
                    <DrawerHeader className='flex flex-col items-center'>
                      <DrawerTitle>Sign in as Customer</DrawerTitle>
                      <DrawerDescription>
                        Log in to find the perfect photographer and bring your
                        vision to life!
                      </DrawerDescription>
                      <Image
                        src='CustomerSigninIcon.svg'
                        alt=''
                        width={152}
                        height={154}
                      />
                    </DrawerHeader>
                    <DrawerFooter className='flex items-center'>
                      <Button type='submit' className='h-10 w-[80%]'>
                        <Icon
                          icon='flat-color-icons:google'
                          width='12'
                          height='12'
                        />
                        Login with email
                      </Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
                <Drawer>
                  <DrawerTrigger>
                    <Image
                      src='photographerIcon.svg'
                      alt={''}
                      width={152}
                      height={154}
                    />
                  </DrawerTrigger>
                  <DrawerContent className='rounded-t-3xl'>
                    <DrawerHeader className='flex flex-col items-center'>
                      <DrawerTitle>Sign in as Photographer</DrawerTitle>
                      <DrawerDescription>
                        Log in to connect with clients and grow your photography
                        business!
                      </DrawerDescription>
                      <Image
                        src='PhotographerSigninIcon.svg'
                        alt=''
                        width={152}
                        height={154}
                      />
                    </DrawerHeader>
                    <DrawerFooter className='flex items-center'>
                      <Button type='submit' className='h-10 w-[80%]'>
                        <Icon
                          icon='flat-color-icons:google'
                          width='12'
                          height='12'
                        />
                        Login with email
                      </Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
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
            <div className='flex flex-row space-x-4'>
              <Image src='customerIcon.svg' alt={''} width={152} height={154} />
              <Image
                src='photographerIcon.svg'
                alt={''}
                width={152}
                height={154}
              />
            </div>
          </div>
          {userType === 'Customer' ? (
            <SignIn userType='Customer' />
          ) : userType === 'Photographer' ? (
            <SignIn userType='Photographer' />
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
              <Drawer>
                <DrawerTrigger>
                  <Image
                    src='customerIcon.svg'
                    alt={''}
                    width={152}
                    height={154}
                  />
                </DrawerTrigger>
                <DrawerContent className='rounded-t-3xl'>
                  <DrawerHeader className='flex flex-col items-center'>
                    <DrawerTitle>Sign in as Customer</DrawerTitle>
                    <DrawerDescription>
                      Log in to find the perfect photographer and bring your
                      vision to life!
                    </DrawerDescription>
                    <Image
                      src='CustomerSigninIcon.svg'
                      alt=''
                      width={152}
                      height={154}
                    />
                  </DrawerHeader>
                  <DrawerFooter className='flex items-center'>
                    <Button type='submit' className='h-10 w-[80%]'>
                      <Icon
                        icon='flat-color-icons:google'
                        width='12'
                        height='12'
                      />
                      Login with email
                    </Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              <Drawer>
                <DrawerTrigger>
                  <Image
                    src='photographerIcon.svg'
                    alt={''}
                    width={152}
                    height={154}
                  />
                </DrawerTrigger>
                <DrawerContent className='rounded-t-3xl'>
                  <DrawerHeader className='flex flex-col items-center'>
                    <DrawerTitle>Sign in as Photographer</DrawerTitle>
                    <DrawerDescription>
                      Log in to connect with clients and grow your photography
                      business!
                    </DrawerDescription>
                    <Image
                      src='PhotographerSigninIcon.svg'
                      alt=''
                      width={152}
                      height={154}
                    />
                  </DrawerHeader>
                  <DrawerFooter className='flex items-center'>
                    <Button type='submit' className='h-10 w-[80%]'>
                      <Icon
                        icon='flat-color-icons:google'
                        width='12'
                        height='12'
                      />
                      Login with email
                    </Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
