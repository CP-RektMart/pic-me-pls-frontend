'use client'

import { useMemo, useState } from 'react'

import {
  customerItems,
  defaultItems,
  photographerItems,
} from '@/data/nav-items'
import { Icon } from '@iconify/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

import { SidebarButton } from '@/components/sidebar/sidebar-button'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

interface SidebarProps {
  handleLogout: () => void
}

export default function Sidebar(props: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const closeSideBar = () => setIsOpen(false)

  const { data: session, status } = useSession()
  const { handleLogout } = props

  const navItems = useMemo(() => {
    if (status !== 'authenticated') {
      return defaultItems
    }

    if (session?.user?.role === 'PHOTOGRAPHER') {
      return photographerItems
    }

    return customerItems
  }, [session?.user?.role, status])

  return (
    <div className='lg:hidden'>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
                  onClick={closeSideBar}
                >
                  <SidebarButton
                    icon={item.icon}
                    title={item.title}
                    link={item.url}
                  />
                </li>
              ))}
            </ul>
            <div className='grid w-full place-content-end gap-2'>
              {status === 'authenticated' ? (
                <button
                  onClick={() => {
                    closeSideBar()
                    handleLogout()
                  }}
                  className='flex w-full items-center justify-end space-x-3 rounded-sm p-4 hover:bg-neutral-200'
                >
                  <span className='text-primary'>Logout</span>
                  <span className='text-primary'>
                    <Icon icon='lucide:log-out' className='size-6' />
                  </span>
                </button>
              ) : (
                <Link href='/login'>
                  <button
                    className='flex w-full items-center justify-end space-x-3 rounded-sm p-4 hover:bg-neutral-200'
                    onClick={closeSideBar}
                  >
                    <span className='text-primary'>Login</span>
                    <span className='text-primary'>
                      <Icon icon='lucide:log-in' className='size-6' />
                    </span>
                  </button>
                </Link>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
