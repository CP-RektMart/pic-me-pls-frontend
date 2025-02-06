'use client'

import { Icon } from '@iconify/react'

import { NavButton } from '@/components/navbar/nav-button'

import { navItems } from '../../data/nav-items'
import Sidebar from '../sidebar'

export default function Navbar() {
  // TODO: Implement handleLogout util?
  const handleLogout = () => {
    return
  }

  return (
    <nav className='flex flex-row items-center justify-between bg-base-primary px-6 py-4 text-white'>
      <div className='text-base font-bold'>PicMePls</div>
      <div className='hidden flex-row gap-6 lg:flex'>
        {/* navigation zone */}
        {navItems.slice(0, 5).map((item, index) => (
          <NavButton
            key={index}
            icon={<Icon icon={item.icon} className='size-4' />}
            title={item.title}
            link={item.url}
          />
        ))}
        {/* authorization zone */}
        {navItems.slice(5, 6).map((item, index) => (
          <NavButton
            key={index}
            icon={<Icon icon={item.icon} className='size-4' />}
            title={item.title}
            link={item.url}
            handleOnClick={handleLogout}
          />
        ))}
      </div>
      <div className='flex flex-row items-center space-x-4'>
        <Icon icon='lucide:bell' className='mt-0.5 size-4' />
        <Sidebar />
      </div>
    </nav>
  )
}
