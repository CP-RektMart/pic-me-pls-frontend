'use client'

import { Bell } from 'lucide-react'

import { NavButton } from '@/components/navbar/navButton'

import { navItems } from '../../data/navItems'
import Sidebar from '../sidebar'

export default function Navbar() {
  return (
    <nav className='flex h-14 flex-row items-center justify-between bg-base-primary p-4 text-white'>
      <div className='text-base font-bold'>PicMePls</div>
      <div className='hidden flex-row gap-6 lg:flex'>
        {/* navigation zone */}
        {navItems.slice(0, 5).map((item, index) => (
          <NavButton
            key={index}
            icon={<item.icon size={16} />}
            title={item.title}
            link={item.url}
          />
        ))}
        {/* authorization zone */}
        {navItems.slice(5, 6).map((item, index) => (
          <NavButton
            key={index}
            icon={<item.icon size={16} />}
            title={item.title}
            link={item.url}
            handleOnClick={() => console.log('clicked')}
          />
        ))}
      </div>
      <div className='flex flex-row items-center space-x-4'>
        <Bell size={16} />
        <Sidebar />
      </div>
    </nav>
  )
}
