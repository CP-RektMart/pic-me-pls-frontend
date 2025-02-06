import { Bell } from 'lucide-react'

import Menu from '@/components/navbar/navButton'
import { SidebarTrigger } from '@/components/ui/sidebar'

import { navItems } from './navItems'

export default function Navbar() {
  return (
    <nav className='flex h-14 flex-row items-center justify-between bg-base-primary p-4 text-white'>
      <div className='text-base font-bold'>PicMePls</div>
      <div className='hidden flex-row gap-6 lg:flex'>
        {navItems.map((item, index) => (
          <Menu
            key={index}
            icon={<item.icon size={16} />}
            title={item.title}
            link={item.url}
          />
        ))}
      </div>
      <div className='flex flex-row items-center space-x-4'>
        <Bell size={16} />
        <SidebarTrigger className='md:invisible'/>
      </div>
    </nav>
  )
}
