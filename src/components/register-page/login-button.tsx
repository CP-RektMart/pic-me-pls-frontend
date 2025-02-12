'use client'

import { cn } from '@/lib/utils'
import { UserType } from '@/type/user'
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
            ? '/PhotographerLoginIcon.svg'
            : '/CustomerLoginIcon.svg'
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
