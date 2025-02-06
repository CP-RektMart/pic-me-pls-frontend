import React, { MouseEventHandler } from 'react'

import Link from 'next/link'

import { Button } from '@/components/ui/button'

interface MenuProps {
  icon: React.ReactNode
  title: string
  link: string
  handleOnClick?: MouseEventHandler<HTMLButtonElement>
}

export function NavButton({ icon, title, link, handleOnClick }: MenuProps) {
  return (
    <Button variant={'ghost'} onClick={handleOnClick}>
      <Link href={link} className='inline-flex h-[10px] items-center space-x-3'>
        <span>{icon}</span>
        <span>{title}</span>
      </Link>
    </Button>
  )
}
