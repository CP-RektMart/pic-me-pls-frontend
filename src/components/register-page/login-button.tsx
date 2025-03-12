'use client'

import { cn } from '@/lib/utils'
import { UserType } from '@/types/user'
import CustomerSignInIcon from '@public/icons/customer-sign-in-icon.svg'
import PhotographerSignInIcon from '@public/icons/photographer-sign-in-icon.svg'
import Image from 'next/image'

import { Button } from '../ui/button'

export default function LoginButton({
  userType,
  onClick,
  isActive,
}: {
  userType: UserType
  onClick?: () => void
  isActive: boolean
}) {
  return (
    <Button
      onClick={onClick}
      variant='login'
      size='login'
      className={cn('hover:bg-zinc-100', isActive ? 'bg-zinc-200' : '')}
    >
      <Image
        src={
          userType === 'Photographer'
            ? PhotographerSignInIcon
            : CustomerSignInIcon
        }
        alt={`${userType} Icon`}
        width={106}
        height={72}
        priority
      />
      <div className='font-medium'>{userType}</div>
    </Button>
  )
}
