import { UserType } from '@/type/user'
import { Icon } from '@iconify/react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import LoginButton from './login-button'

export default function SignInDrawer({
  userType,
  onClick,
  onClose,
}: {
  userType: UserType
  onClick?: () => void
  onClose?: () => void
}) {
  return (
    <Drawer onOpenChange={(open) => !open && onClose && onClose()}>
      <DrawerTrigger onClick={onClick}>
        <LoginButton userType={userType} />
      </DrawerTrigger>
      <DrawerContent className='rounded-t-3xl border border-zinc-200'>
        <DrawerHeader className='flex flex-col gap-4 px-6 py-4'>
          <div className='flex w-full flex-col gap-2 text-left'>
            <DrawerTitle className='text-lg'>Sign in as {userType}</DrawerTitle>
            <DrawerDescription className='text-sm font-normal'>
              {userType === 'Photographer'
                ? 'Log in to connect with clients and grow your photography business!'
                : userType === 'Customer'
                  ? 'Log in to find the perfect photographer and bring your vision to life!'
                  : ''}
            </DrawerDescription>
          </div>
          <div className='flex w-full justify-center'>
            <Image
              src={
                userType === 'Photographer'
                  ? 'PhotographerSigninIcon.svg'
                  : 'CustomerSigninIcon.svg'
              }
              alt=''
              width={162}
              height={224}
            />
          </div>
        </DrawerHeader>
        <DrawerFooter className='flex items-center'>
          <Button type='submit' className='h-10 w-[80%]'>
            <Icon icon='flat-color-icons:google' className='size-3' />
            Login with email
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
