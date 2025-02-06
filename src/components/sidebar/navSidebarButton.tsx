import React, { MouseEventHandler } from 'react'

import Link from 'next/link'

interface MenuProps {
  icon: React.ReactNode
  title: string
  link: string
  handleOnClick?: MouseEventHandler<HTMLButtonElement>
}

export function SidebarButton({ icon, title, link, handleOnClick }: MenuProps) {
  return (
    <button onClick={handleOnClick} className='w-full'>
      <Link
        href={link}
        className='flex w-full cursor-pointer items-center justify-start space-x-3 p-2'
      >
        <span className='text-primary'>{icon}</span>
        <span className='text-primary'>{title}</span>
      </Link>
    </button>
  )
}
