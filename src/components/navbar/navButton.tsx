import React, { MouseEventHandler } from 'react'

import Link from 'next/link'

interface MenuProps {
  icon: React.ReactNode
  title: string
  link: string
  handleOnClick?: MouseEventHandler<HTMLButtonElement>
}

export default function Menu({ icon, title, link, handleOnClick }: MenuProps) {
  return (
    <button onClick={handleOnClick}>
      <Link href={link} className='inline-flex h-[10px] items-center space-x-3'>
        <span>{icon}</span>
        <span>{title}</span>
      </Link>
    </button>
  )
}
