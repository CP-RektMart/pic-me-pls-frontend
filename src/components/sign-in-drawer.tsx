import { Icon } from '@iconify/react'
import Image from 'next/image'

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

export default function SignInDrawer({
    userType,
    onClick,
    onClose,
  }: {
    userType: 'Customer' | 'Photographer' | ''
    onClick?: () => void
    onClose?: () => void
  }) {
    return (
      <Drawer onOpenChange={(open) => !open && onClose && onClose()}>
        <DrawerTrigger onClick={onClick}>
          <Image
            src={
              userType === 'Photographer'
                ? 'PhotographerIcon.svg'
                : 'CustomerIcon.svg'
            }
            alt={`${userType} Icon`}
            width={152}
            height={154}
            priority={true}
          />
        </DrawerTrigger>
        <DrawerContent className='rounded-t-3xl border-[1px] border-zinc-200'>
          <DrawerHeader className='flex flex-col items-center'>
            <DrawerTitle>Sign in as {userType}</DrawerTitle>
            <DrawerDescription>
              {userType === 'Photographer'
                ? 'Log in to find the perfect photographer and bring your vision to life!'
                : 'Log in to book photographers or showcase your talent.'}
            </DrawerDescription>
            <Image
              src={
                userType === 'Photographer'
                  ? 'PhotographerSigninIcon.svg'
                  : 'CustomerSigninIcon.svg'
              }
              alt=''
              width={152}
              height={154}
            />
          </DrawerHeader>
          <DrawerFooter className='flex items-center'>
            <Button type='submit' className='h-10 w-[80%]'>
              <Icon icon='flat-color-icons:google' width='12' height='12' />
              Login with email
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }
  
  