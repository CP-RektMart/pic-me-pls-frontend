import React from 'react'

interface MenuProps {
  icon: React.ReactNode
  text: string
}

export default function Menu({ icon, text }: MenuProps) {
  return (
    <div className='inline-flex h-[10px] items-center space-x-3'>
      <div>{icon}</div>
      <div>{text}</div>
    </div>
  )
}
