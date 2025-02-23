import React, { MouseEventHandler } from 'react'

import { Icon } from '@iconify/react'
import Link from 'next/link'

interface MenuProps {
  icon: string
  title: string
  link: string
  handleOnClick?: MouseEventHandler<HTMLButtonElement>
}

export function NavButton({ icon, title, link, handleOnClick }: MenuProps) {
  return (
    <button
      onClick={handleOnClick}
      className='hover:underline hover:underline-offset-4'
    >
      <Link href={link} className='inline-flex items-center space-x-3'>
        <div className='size-4'>
          <Icon icon={icon} className='size-full' />
        </div>
        <span className='place-items-end'>{title}</span>
      </Link>
    </button>
  )
}
