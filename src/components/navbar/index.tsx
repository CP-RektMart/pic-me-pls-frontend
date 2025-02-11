'use client'

import { logout } from '@/app/actions/logout'
import { Icon } from '@iconify/react'
import { signOut, useSession } from 'next-auth/react'

import { NavButton } from '@/components/navbar/nav-button'

import { navItems } from '../../data/nav-items'
import Sidebar from '../sidebar'

export default function Navbar() {
  const { status } = useSession()
  const handleLogout = async () => {
    const result = await logout()
    await signOut()
    console.log('Logged out', result)
  }

  return (
    <nav className='sticky flex w-full flex-row items-center justify-between bg-base-primary px-6 py-4 text-white'>
      <div className='text-base font-bold'>PicMePls</div>
      <div className='hidden flex-row gap-6 lg:flex'>
        {navItems.slice(0, 5).map((item, index) => (
          <NavButton
            key={index}
            icon={item.icon}
            title={item.title}
            link={item.url}
          />
        ))}
        {status === 'authenticated' ? (
          <NavButton
            icon='lucide:log-out'
            title='Logout'
            link='#'
            handleOnClick={handleLogout}
          />
        ) : (
          <NavButton icon='lucide:log-in' title='Login' link='/login' />
        )}
      </div>
      <div className='flex flex-row items-center space-x-4'>
        <Icon icon='lucide:bell' className='mt-0.5 size-4' />
        <Sidebar handleLogout={handleLogout} />
      </div>
    </nav>
  )
}
