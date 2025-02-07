'use client'

import { UserType } from '@/type/user'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import LoginButton from './login-button'
import SignInContent from './sign-in-content'

export default function SignInDrawer({
  userType,
  onClick,
  onClose,
}: {
  userType: UserType
  onClick: () => void
  onClose: () => void
}) {
  return (
    <Drawer onOpenChange={(open) => !open && onClose?.()}>
      <DrawerTrigger asChild className='md:hidden'>
        <LoginButton userType={userType} onClick={onClick} />
      </DrawerTrigger>
      <DrawerContent className="flex flex-col rounded-t-3xl border border-zinc-200 items-center md:hidden">
        <SignInContent userType={userType} />
        <DrawerHeader className='md:hidden'>
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  )
}