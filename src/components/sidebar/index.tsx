'use client'

import { Menu } from 'lucide-react'

import { SidebarButton } from '@/components/sidebar/navSidebarButton'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { navItems } from '../../data/navItems'

export default function NavSidebar() {
  return (
    <div className='lg:hidden'>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='ghost' className='p-2'>
            <Menu size={16} />
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
                    icon={<item.icon size={16} />}
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
                  {/* TODO: Add onClick event, handlelogout */}
                  <button
                    onClick={() => console.log('clicked')}
                    className='flex items-center justify-end space-x-3'
                  >
                    <span className='text-primary'>{item.title}</span>
                    <span className='text-primary'>
                      {<item.icon size={16} />}
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
