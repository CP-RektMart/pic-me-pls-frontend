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
    <button onClick={handleOnClick}>
      <Link href={link} className='flex items-center justify-end space-x-3'>
        <span className='text-primary'>{icon}</span>
        <span className='text-primary'>{title}</span>
      </Link>
    </button>
  )
}
