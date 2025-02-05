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
              width={152}
              height={154}
            />
          </div>
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