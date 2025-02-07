'use client'

import { Icon } from '@iconify/react'

import { SidebarButton } from '@/components/sidebar/sidebar-button'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { navItems } from '../../data/nav-items'

export default function NavSidebar() {
  const handleLogout = () => {
    return
  }

  return (
    <div className='lg:hidden'>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='ghost' className='p-2'>
            <Icon icon='lucide:menu' className='size-4' />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle></SheetTitle>
          <div className='flex size-full flex-col justify-between'>
            <ul className='grid w-full place-items-start gap-2 py-8'>
              {navItems.slice(0, 5).map((item, index) => (
                <li
                  key={index}
                  className='w-full place-items-start rounded-sm hover:bg-neutral-200'
                >
                  <SidebarButton
                    icon={item.icon}
                    title={item.title}
                    link={item.url}
                  />
                </li>
              ))}
            </ul>
            <ul className='grid w-full place-content-end gap-2'>
              {navItems.slice(5, 6).map((item, index) => (
                <li
                  key={index}
                  className='w-full rounded-sm p-4 hover:bg-neutral-200'
                >
                  <button
                    onClick={handleLogout}
                    className='flex items-center justify-end space-x-3'
                  >
                    <span className='text-primary'>{item.title}</span>
                    <span className='text-primary'>
                      <Icon icon={item.icon} className='size-6' />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
