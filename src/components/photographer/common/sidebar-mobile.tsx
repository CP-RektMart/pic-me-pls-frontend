'use client'

import { logout } from '@/actions/logout'
import { signOut } from '@/auth'
import { photographerItems } from '@/data/nav-items'
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export const SidebarMobile = () => {
  const handleLogout = async () => {
    const result = await logout()
    if (result?.error) {
      console.error(result.error)
      return
    }
    await signOut({
      redirect: true,
      redirectTo: '/',
    })
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' className='relative size-9'>
          <Icon icon='lucide:menu' className='size-4' />
        </Button>
      </SheetTrigger>
      <SheetContent className='px-5 pb-4 pt-12'>
        <SheetTitle></SheetTitle>
        <div className='flex h-full flex-col justify-between'>
          <div className='flex flex-1 flex-col gap-2'>
            {photographerItems.map((item) => (
              <Link href={item.url} key={item.title}>
                <SheetTrigger asChild>
                  <Button variant='ghost' className='flex w-full justify-start'>
                    <div className='flex size-6 flex-col items-center justify-center'>
                      <Icon icon={item.icon} className='size-full' />
                    </div>
                    <div className='font-medium'>{item.title}</div>
                  </Button>
                </SheetTrigger>
              </Link>
            ))}
          </div>

          <Button
            onClick={handleLogout}
            variant='ghost'
            className='flex w-full justify-start'
          >
            <div className='flex size-6 flex-col items-center justify-center'>
              <Icon icon='lucide:log-out' className='size-full' />
            </div>
            <div className='font-medium'>Logout</div>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
